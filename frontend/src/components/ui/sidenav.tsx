"use client";

import Link from "next/link";
import NavLinks from "@/src/components/ui/nav-links";
import Logo from "@/src/components/logo";
import { MenuIcon, PowerIcon, XIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Card } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { useEffect, useState } from "react";
import { SideNavSkeleton } from "@/src/components/ui/skeletons";
import { Button } from "@/src/components/ui/button";

interface UserProfile {
  name: string;
  avatar: string | null;
  image: string | null;
  email: string;
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
          prev?.name !== data.name ||
          prev?.avatar !== data.avatar ||
          prev?.image !== session?.user?.image ||
          prev?.email !== session?.user?.email
            ? {
                name: data.name || session?.user?.name || "User",
                image: session?.user?.image || null,
                avatar: data.avatar || null,
                email: session?.user?.email || "",
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

  const displayedUser = userProfile?.avatar || userProfile?.image || undefined;

  if (isPageLoading) {
    return <SideNavSkeleton />;
  }

  return (
    <div className="flex h-full flex-col md:bg-transparent relative">
      {/* Mobile Menu Toggle */}
      <div className="absolute top-4 right-4 z-50 md:hidden">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="icon"
          className="p-2"
        >
          {isOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="sidenav-fixed inset-0 z-40 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsOpen(false)}
          />

          {/* Sliding Menu */}
          <div
            className="absolute top-0 left-0 w-full h-[50vh] 
            animate-slide-down origin-top m-0 p-0
            rounded-lg shadow-lg
            "
          >
            <div className="flex flex-col space-y-2 p-4 animate-slide-up">
              <Card>
                <Link className="flex mx-auto py-2 px-1" href="/home">
                  <Logo />
                </Link>
              </Card>
              <Separator className="mb-5" />

              {/* User profile */}
              <Card>
                <div className="p-2">
                  <div className="flex items-center text-sm gap-2">
                    <Avatar>
                      <AvatarImage
                        src={displayedUser}
                        alt={`${
                          userProfile?.name || session?.user?.name
                        }'s profile picture`}
                      />
                      <AvatarFallback>
                        <img
                          src="/profile-placeholder.png"
                          alt="Profile Placeholder"
                        />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium ">
                        {userProfile?.name || "User"}
                      </span>
                      <span className="text-xs ">{userProfile?.email}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Navigation links */}
              <div className="flex flex-col space-y-2">
                <NavLinks />
              </div>

              {/* Sign out button */}
              <Card className="mt-4">
                <button
                  onClick={() => signOut({ callbackUrl: "/sign-in" })}
                  className="flex h-[48px] w-full items-center justify-center gap-2 rounded-lg p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
                >
                  <PowerIcon className="w-6" />
                  <span className="mr-2 text-left">Sign Out</span>
                </button>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col px-3 py-4 md:px-2 h-full">
        {/* Logo */}
        <Link className="flex mx-7 md:mx-auto p-4 md:h-40 -mt-3" href="/home">
          <Logo />
        </Link>
        <Separator className="md:-mt-4 mb-5 mx-8 md:mx-3 w-10/12" />

        {/* User profile */}
        <div className="mb-4">
          <div className="flex items-center mx-1 text-sm gap-2">
            <Avatar>
              <AvatarImage
                src={displayedUser}
                alt={`${
                  userProfile?.name || session?.user?.name
                }'s profile picture`}
              />
              <AvatarFallback>
                <img src="/profile-placeholder.png" alt="Profile Placeholder" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {userProfile?.name || "User"}
              </span>
              <span className="text-xs">{userProfile?.email}</span>
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
        <Card className="flex mt-4 md:mt-104">
          <button
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
            className="flex h-[48px] w-full items-center justify-center gap-2 rounded-lg p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
          >
            <PowerIcon className="w-6" />
            <span className="md:inline md:mr-2 text-left">Sign Out</span>
          </button>
        </Card>
      </nav>
    </div>
  );
}
