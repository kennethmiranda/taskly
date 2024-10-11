import Logo from "@/src/components/logo";
import { Button } from "@/src/components/ui/button";
import { lusitana } from "@/src/components/fonts";
import { ThemeToggle } from "@/src/components/ui/theme-toggle";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Separator } from "@/src/components/ui/separator";
import Link from "next/link";
import { CardFooter } from "@/src/components/ui/card";
import { CarouselComponent } from "@/src/components/carousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Manager and Cloud Storage System",
  description: "Manage your tasks and store your files securely in the cloud.",
};

export default function Page() {
  return (
    <main className="mt-4 gap-4 grow content-center flex min-h-screen flex-col p-6">
      {/* Theme Toggle for testing, remove in production */}
      <ThemeToggle />

      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg mx-20 px-6 py-10 md:w-2/5 md:px-20">
          <Logo />
          <Separator className="mt-5 mb-5" />
          <p
            className={`${lusitana.className} text-xl md:text-3xl md:leading-normal`}
          >
            <strong>
              Welcome to the Task Manager and Cloud Storage System.
            </strong>
          </p>
          <Button>
            <Link
              href="/sign-in"
              className="flex items-center gap-5 rounded-lg px-6 py-3 text-sm font-medium transition-colors md:text-base"
            >
              Sign In
              <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </Button>
          <CardFooter className="text-muted-foreground items-center justify-center text-xs">
            No Account?
            <Link href="/sign-up" className="px-1.5 underline text-blue-400">
              Sign Up
            </Link>
          </CardFooter>
        </div>
        <div className="flex items-center -mt-30 justify-center md:w-3/5 md:px-28 md:py-12">
          <CarouselComponent />
        </div>
      </div>
    </main>
  );
}
