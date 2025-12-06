import { getMyWorks } from "@/lib/workActions";
import { notFound, redirect } from "next/navigation";
import JobCard from "../list/JobCard";
export async function WorksList() {
  const result = await getMyWorks();
  if (!result.success) {
    notFound();
  }
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {result.data.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            href={`/job/student/list/${job.id}`}
          />
        ))}
      </div>

      {result.data.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          現在、応募中のお仕事はありません。
        </p>
      )}
    </div>
  );
}
