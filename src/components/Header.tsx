import React from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { currentUser } from "../lib/currentUser";
import { signOutAction } from "../lib/authActions";
import { MobileMenu } from "./MobileMenu";
import PcMenu from "./ui/PcMenu";
export async function Header() {
  const user = await currentUser();
  const role = user?.role;
  return (
    <header className="h-16 border-b px-6 flex items-center bg-white">
      <Button asChild variant="ghost" className="font-bold text-xl mr-4">
        <Link href="/">AgriMatch</Link>
      </Button>

      <div className="hidden md:flex items-center gap-2 w-full">
        <nav className="flex items-center gap-2">
          {role === "student" && (
            <>
              <Button asChild variant="ghost">
                <Link href="/job/list">募集一覧</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/job/favorite">お気に入り</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/job/work">働く</Link>
              </Button>
            </>
          )}
          {role === "farmer" && (
            <>
              <Button asChild variant="ghost">
                <Link href="/job/create">募集作成</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/job/dashboard">募集管理</Link>
              </Button>
            </>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          {user ? (
            <>
              <PcMenu />
              <form action={signOutAction}>
                <Button variant="outline">ログアウト</Button>
              </form>
            </>
          ) : (
            <Button asChild>
              <Link href="/auth/signin">ログイン</Link>
            </Button>
          )}
        </div>
      </div>
      <MobileMenu user={user} />
    </header>
  );
}
