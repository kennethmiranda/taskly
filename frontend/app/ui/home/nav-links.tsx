"use client";

import {
  HomeIcon,
  CloudIcon,
  ClipboardDocumentListIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  LockClosedIcon,
  FingerPrintIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/home", icon: HomeIcon },
  {
    name: "Tasks",
    href: "/home/tasks",
    icon: ClipboardDocumentListIcon,
  },
  { name: "Storage", href: "/home/storage", icon: CloudIcon },
  {
    name: "Frequently Asked Questions",
    href: "/home/faq",
    icon: QuestionMarkCircleIcon,
  },
  {
    name: "Privacy Policy",
    href: "/home/policy",
    icon: InformationCircleIcon /* | LockClosedIcon | FingerPrintIcon */,
  },
  {
    name: "Settings",
    href: "/home/settings",
    icon: Cog6ToothIcon /* | Cog8ToothIcon */,
  },
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
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
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
