"use client";

import SideNav from "@/src/components/ui/sidenav";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full md:w-64 flex-none md:flex-shrink-0">
        <SessionProvider>
          <SideNav />
        </SessionProvider>
      </div>
      <div className="flex-grow p-4 md:p-8 overflow-auto">{children}</div>
    </div>
  );
}
