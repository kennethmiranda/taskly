"use client";

import Link from "next/link";
import NavLinks from "@/src/components/ui/nav-links";
import Logo from "@/src/components/logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Card } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { useEffect, useState } from "react";
import { IconLoader } from "@tabler/icons-react";

interface UserProfile {
  name: string;
  avatar: string | null;
}

export default function SideNav() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!session?.user?.email) {
        setIsPageLoading(false);
        return;
      }

      try {
        setIsPageLoading(true);

        const response = await fetch("http://localhost:3002/api/profile", {
          headers: {
            email: session.user.email,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserProfile((prev) =>
          prev?.name !== data.name || prev?.avatar !== data.avatar
            ? {
                name: data.name || session?.user?.name || "User",
                avatar: data.avatar || session?.user?.image || null,
              }
            : prev
        );
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsPageLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchUserProfile();
    } else {
      setIsPageLoading(false);
    }
  }, [session]);

  const displayedUser = userProfile || {
    name: session?.user?.name || "User",
    avatar: session?.user?.image || null,
  };

  if (isPageLoading) {
    return (
      <div className="flex w-full h-[400px] items-center justify-center">
        <IconLoader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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

        <div className="mb-4">
          <div className="flex items-center mx-1 text-sm gap-2">
            <Avatar>
              <AvatarImage
                src={displayedUser.avatar || "/profile-placeholder.png"}
                alt={`${
                  userProfile?.name || session?.user?.name
                }'s profile picture`}
              />
              <AvatarFallback>
                {displayedUser.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {displayedUser.name || "User"}
              </span>
              <span className="text-xs">{session?.user?.email}</span>
            </div>
          </div>
        </div>

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
