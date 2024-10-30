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

export default function SideNav() {
  const { data: session } = useSession();

  return (
    <div className="flex h-screen">
      <nav className="flex h-full flex-col px-3 py-4 md:px-2">
        {/* Logo */}
        <Link className="flex p-4 md:h-40 -mt-3" href="/home">
          <Logo />
        </Link>
        <Separator className="-mt-3 mb-4 mx-3 w-10/12" />

        {/* User profile */}
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          {session && session.user && (
            <>
              <div className="flex items-center mx-1 text-sm gap-2 mb-6 mt-6">
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
                {session.user.name}

                <div className="flex-grow"></div>
                <ThemeToggle />
              </div>
              <div className="flex items-center text-sm gap-2">
                <div>({session.user.email})</div>
              </div>
            </>
          )}

          {/* Navigation links */}
          <NavLinks />
        </div>

        <div className="flex-grow h-32"></div>
        <div className="flex-grow h-32"></div>

        {/* Sign out button */}
        <div className="mt-auto">
          <Card>
            <button
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-lg p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600  md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </Card>
        </div>
      </nav>
      {/* keep or remove? */}
      <Separator className="h-10/12 mt-15" orientation="vertical" />
    </div>
  );
}
