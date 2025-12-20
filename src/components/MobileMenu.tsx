"use client";
import {
  Briefcase,
  List,
  LogOut,
  Menu,
  PlusCircle,
  Settings,
  Star,
  User,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/src/components/ui/dropdown-menu";
import { MobileMenuItem } from "./MobileMenuItem";
import { SafeUser } from "../lib/currentUser";
import { signOutAction } from "../lib/authActions";
type MobileMenuProps = {
  user: SafeUser | null;
};
export function MobileMenu({ user }: MobileMenuProps) {
  const role = user?.role;
  const STUDENT_ITEM = [
    { label: "募集一覧", href: "/job/list", icon: List },
    { label: "お気に入り", href: "/job/favorite", icon: Star },
    { label: "働く", href: "/job/work", icon: Briefcase },
  ];
  const FARMER_ITEM = [
    { label: "募集作成", href: "/job/create", icon: PlusCircle },
    { label: "募集管理", href: "/job/dashboard", icon: Settings },
  ];
  const menuItems =
    role === "student" ? STUDENT_ITEM : role === "farmer" ? FARMER_ITEM : [];

  return (
    <div className="md:hidden ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>メニュー</DropdownMenuLabel>
          <DropdownMenuGroup>
            {menuItems.map((item) => (
              <MobileMenuItem
                key={item.href}
                label={item.label}
                href={item.href}
                icon={item.icon}
              />
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {user ? (
            <>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>マイページ</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <MobileMenuItem
                    href="/profile/messages"
                    icon={List}
                    label="メッセージ"
                  />
                  <MobileMenuItem
                    href="/profile/edit"
                    icon={Settings}
                    label="プロフィール"
                  />
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <form action={signOutAction} className="w-full">
                  <button
                    type="submit"
                    className="w-full flex items-center text-red-600 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> ログアウト
                  </button>
                </form>
              </DropdownMenuItem>
            </>
          ) : (
            <MobileMenuItem label="ログイン" href="/auth/signin" icon={User} />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
