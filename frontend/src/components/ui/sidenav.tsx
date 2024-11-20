import Link from "next/link";
import NavLinks from "@/src/components/ui/nav-links";
import Logo from "@/src/components/logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { ThemeToggle } from "@/src/components/ui/theme-toggle";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Card } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { useState } from "react";

export default function SideNav() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-full flex-col  md:bg-transparent">
      {/* Collapsible toggle for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block md:hidden px-4 py-2 text-sm font-medium "
      >
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Sidebar */}
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex flex-col px-3 py-4 md:px-2 h-full`}
      >
        {/* Logo */}
        <Link className="flex p-4 md:h-40 -mt-3" href="/home">
          <Logo />
        </Link>
        <Separator className="-mt-3 mb-4 mx-3 w-10/12" />

        {/* User profile */}
        {session?.user && (
          <div className="mb-4">
            <div className="flex items-center mx-1 text-sm gap-2">
              <Avatar>
                <AvatarImage
                  src={session.user.image || undefined}
                  alt={`${session.user.name}'s profile picture`}
                />
                <AvatarFallback>
                  <img
                    src="/profile-placeholder.png"
                    alt="Profile Placeholder"
                  />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{session.user.name}</span>
                <span className="text-xs ">{session.user.email}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation links */}
        <div className="flex flex-col space-y-2">
          <NavLinks />
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Sign out button */}

        <Card className="mt-4 md:mt-auto">
          <button
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
            className="flex h-[48px] w-full items-center justify-center gap-2 rounded-lg p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
          >
            <PowerIcon className="w-6" />
            <span className="md:inline text-left">Sign Out</span>
          </button>
        </Card>
      </nav>
    </div>
  );
}
