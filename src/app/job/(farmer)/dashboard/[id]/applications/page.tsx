import { notFound, redirect } from "next/navigation";
import { ApplicantCard, Application } from "./ApplicantCard";
import { getMyJob } from "@/src/lib/jobActions";
import { getApplications } from "@/src/lib/applicationActions";
import { currentUser } from "@/src/lib/currentUser";

type ParamsProps = {
  params: Promise<{ id: string }>;
};
export default async function page({ params }: ParamsProps) {
  const { id } = await params;
  const jobId = Number(id);
  if (isNaN(jobId)) notFound();
  const user = await currentUser();
  if (!user) {
    redirect("/login");
  }
  if (user.role !== "farmer") {
    notFound();
  }
  const [jobRes, appsRes] = await Promise.all([
    getMyJob(jobId),
    getApplications(jobId),
  ]);
  if (!jobRes.success || !jobRes.data) return notFound();

  const job = jobRes.data;
  if (!appsRes.success) {
    return (
      <div className="p-10 text-center text-red-600">
        <p>データの取得に失敗しました。</p>
        <p className="text-sm text-gray-500">{appsRes.message}</p>
      </div>
    );
  }
  const applications = (appsRes.data || []) as Application[];
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 mb-2">応募者一覧</p>
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        {applications.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>まだ応募はありません。</p>
          </div>
        ) : (
          applications.map((app) => (
            <ApplicantCard key={app.id} application={app} />
          ))
        )}
      </div>
    </div>
  );
}
