import { Separator } from "@/src/components/ui/separator";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <nav className="flex -mt-10 -ml-4 sm:-mt-4 p-4">
        {/* Logo */}
        <div className="sm:justify-start -ml-9 sm:ml-10">
          <Link href="http://localhost:3000">
            <GlobeAltIcon className="h-10 sm:h-12 w-10 sm:w-12 rotate-[15deg]" />
          </Link>
        </div>

        {/* Links */}
        <div className="flex-shrink-0 justify-center ml-3 sm:ml-104 mt-3 sm:mt-5">
          <div className="flex gap-2 sm:gap-20">
            <Link
              href="http://localhost:3000"
              className="font-bold text-xs sm:text-sm font-inter"
            >
              Start
            </Link>

            <Link
              href="/terms-of-service"
              className="font-bold text-xs sm:text-sm font-inter"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="font-bold text-xs sm:text-sm font-inter"
            >
              Privacy Policy
            </Link>
            <Link
              href="/docs"
              className="font-bold text-xs sm:text-sm font-inter"
            >
              Docs
            </Link>
            <Link
              href="/sign-in"
              className="flex font-bold text-xs sm:text-sm font-inter"
            >
              Sign In
              <ArrowRightIcon className="ml-1 h-4 w-4 sm:mt-0.5" />
            </Link>
          </div>
        </div>
      </nav>
      <Separator className="sm:mt-4 mb-5 -mx-2" />
    </>
  );
}
