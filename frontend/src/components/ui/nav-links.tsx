"use client";

import {
  HomeIcon,
  CloudIcon,
  ClipboardDocumentListIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Card } from "@/src/components/ui/card";

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
    id: "faq",
    name: "Frequently Asked Questions",
    href: "/home/faq",
    icon: QuestionMarkCircleIcon,
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
          <Card key={link.name}>
            <Link
              href={link.href}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-lg p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  "bg-sky-100 text-blue-600": pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-6 h-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          </Card>
        );
      })}
    </>
  );
}
