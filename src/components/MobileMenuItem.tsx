import Link from "next/link";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { LucideIcon } from "lucide-react";
type MobileMenuItemProps = {
  label: string;
  href: string;
  icon: LucideIcon;
};
export function MobileMenuItem({
  label,
  href,
  icon: Icon,
}: MobileMenuItemProps) {
  return (
    <DropdownMenuItem asChild>
      <Link
        href={href}
        className="w-full cursor-pointer flex items-center py-2 "
      >
        <Icon className="mr-2 h-4 w-4" />
        <span>{label}</span>
      </Link>
    </DropdownMenuItem>
  );
}
