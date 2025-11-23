import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            農学生と農家の
            <br className="md:hidden" />
            新しいつながりを
          </h2>
          <p className="text-xl text-gray-600">
            現場を知りたい学生と、力を借りたい農家をつなぐプラットフォーム
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-green-500 flex flex-col items-center hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">学生の方</h3>
            <p className="text-gray-600 mb-6 text-center">
              現場の経験を積もう。
            </p>
            <Link href="/job/student/list" className="w-full">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
                仕事を探す
              </Button>
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-amber-600 flex flex-col items-center hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">農家の方</h3>
            <p className="text-gray-600 mb-6 text-center">
              意欲ある農学生に手伝ってもらおう。
            </p>
            <Link href="/job/farmer/dashboard" className="w-full">
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-6">
                学生を募集する
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
