import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/authActions";
import { currentUser } from "@/lib/currentUser";
import { getRole } from "@/lib/profileActions";

const Header = async () => {
  const user = await currentUser();
  const role = await getRole();
  //getRoleにuserを持たせるのもいいかも

  return (
    <header className="h-16 border-b gap-4 px-6 flex items-center">
      <Button asChild variant="ghost" className="font-bold text-xl">
        <Link href="/">header</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/job/list">募集一覧</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/list">お気に入り</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/mypage">マイページ</Link>
      </Button>
      {role === "farmer" && (
        <Button asChild variant="ghost">
          <Link href="/job/create">募集の新規作成</Link>
        </Button>
      )}
      <span className="flex-1"></span>
      {user ? (
        <form action={signOutAction}>
          <Button variant="outline">ログアウト</Button>
        </form>
      ) : (
        <form>
          <Button asChild>
            <Link href="/auth/signin">ログイン</Link>
          </Button>
        </form>
      )}
    </header>
  );
};
export default Header;
