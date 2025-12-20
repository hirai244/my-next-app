import { List, Settings } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./menubar";
import Link from "next/link";
export default function PcMenu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>マイページ</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link
              href="/profile/messages"
              className="w-full cursor-pointer flex items-center py-2 "
            >
              <List className="mr-2 h-4 w-4" />
              <span>メッセージ</span>
            </Link>
          </MenubarItem>
          <MenubarSeparator />

          <MenubarItem asChild>
            <Link
              href="/profile/edit"
              className="w-full cursor-pointer flex items-center py-2 "
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>プロフィール</span>
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
