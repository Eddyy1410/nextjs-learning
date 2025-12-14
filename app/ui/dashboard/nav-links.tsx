"use client";
// Định nghĩa: Đây đúng là cái "công tắc" để biến một file thành Client Component.
// Mặc định: Trong Next.js (App Router), mọi thứ mặc định là Server.
// Khi nào dùng: Khi bạn cần dùng Hooks (có chữ "use" đúng đầu như: useState, useEffect...) hoặc sự kiện (onClick).
// React Hooks: useState, useEffect... (cũ), Next.js Hooks: usePathname, useRouter... (mới)
// Cách dùng: Bạn đặt 'use client' lên đầu file.
// => Kết luận: File nào có 'use client' thì file đó là Client Component.

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
  },
  { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-sky-100 text-blue-600': pathname === link.href,
            }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
