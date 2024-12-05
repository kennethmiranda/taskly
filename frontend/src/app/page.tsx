import Logo from "@/src/components/logo";
import { Button } from "@/src/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Separator } from "@/src/components/ui/separator";
import Link from "next/link";
import { CardFooter } from "@/src/components/ui/card";
import { CarouselComponent } from "@/src/components/carousel";
import { Metadata } from "next";
import Footer from "@/src/components/footer";

export const metadata: Metadata = {
  title: "Task Manager and File Storage System",
  description: "Manage your tasks and store your files.",
};

export default function Page() {
  return (
    <main className="mt-4 flex min-h-screen flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-8 md:flex-row md:space-y-16">
        {/* Sign In */}
        <div className="flex flex-col items-center justify-center gap-6 rounded-lg p-6 sm:px-10 sm:py-12 md:w-2/5">
          <Link href="http://localhost:3000">
            <Logo />
          </Link>
          <Separator className="mt-3 mb-2 w-full" />
          <p className="text-center text-lg font-semibold sm:text-xl md:text-2xl">
            Welcome to the Task Manager and File Storage System
          </p>
          <Button asChild>
            <Link
              href="/sign-in"
              className="flex items-center justify-center gap-3 rounded-lg px-4 py-2 text-sm font-medium  transition-colors hover:bg-blue-600 sm:px-6 sm:py-3 md:text-base"
            >
              Sign In
              <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </Button>
          <CardFooter className="text-center text-xs text-muted-foreground">
            No Account?&nbsp;
            <Link
              href="/sign-up"
              className="text-blue-500 underline hover:text-blue-600"
            >
              Sign Up
            </Link>
          </CardFooter>
        </div>

        {/* Carousel */}
        <div className="flex items-center justify-center md:w-3/5 md:px-10 md:py-12">
          <CarouselComponent />
        </div>
      </div>

      {/* Footer */}
      <div className="sm:space-y-4 mt-8">
        <Separator className="mt-3 mb-2 w-full" />
        <Footer />
      </div>
    </main>
  );
}
