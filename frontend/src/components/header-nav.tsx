import Logo from "@/src/components/logo";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function HeaderNav() {
  return (
    <nav className="flex items-center justify-between -mt-4 p-4">
      <div className="flex-shrink-0">
        <Link href="http://localhost:3000">
          <Logo />
        </Link>
      </div>
      <div className="flex-1 flex justify-start ml-60 mt-5">
        <div className="flex gap-10">
          <Link
            href="http://localhost:3000"
            className="font-bold text-base font-inter"
          >
            Start
          </Link>

          <Link
            href="/terms-of-service"
            className="font-bold text-base font-inter"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy-policy"
            className="font-bold text-base font-inter"
          >
            Privacy Policy
          </Link>
          <Link href="/docs" className="font-bold text-base font-inter">
            Documentation
          </Link>
          <Link href="/sign-in" className="flex font-bold text-base font-inter">
            Sign In
            <ArrowRightIcon className="ml-auto h-5 w-5 mt-0.5" />
          </Link>
          {/* <ArrowRightIcon className="-ml-7 h-5 w-5 mt-0.5" /> */}
        </div>
      </div>
    </nav>
  );
}
