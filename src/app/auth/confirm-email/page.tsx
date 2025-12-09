import AuthCard from "@/src/app/auth/AuthCard";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default function ConfirmEmailPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <AuthCard
        title="メールを確認してください"
        description="ご登録いただいたメールアドレス宛に、アカウント有効化のための確認リンクを送信しました。"
      >
        <p className="text-sm text-gray-600 text-center space-y-4">
          メールボックスに届いたリンクをクリックすると、認証が完了し、サービスにログインできるようになります。
        </p>

        <div className="mt-8">
          <Button asChild className="w-full">
            <Link href="/auth/login">ログインページに戻る</Link>
          </Button>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          <p>
            メールが届かない場合は、迷惑メールフォルダをご確認いただくか、数分待ってから再度お試しください。
          </p>
        </div>
      </AuthCard>
    </div>
  );
}
