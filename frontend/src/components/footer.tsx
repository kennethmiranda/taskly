import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function Footer() {
  return (
    <nav className="flex sm:-mt-4 p-4">
      {/* Logo */}
      <div className="justify-start -ml-6 sm:ml-10">
        <Link href="http://localhost:3000">
          <GlobeAltIcon className="h-10 sm:h-12 w-10 sm:w-12 rotate-[15deg]" />
        </Link>
      </div>

      {/* Links */}
      <div className="flex-shrink-0 justify-center ml-3 sm:ml-112 mt-3 sm:mt-5">
        <div className="flex gap-4 sm:gap-24">
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

      {/* Socials */}
      <div className="flex-1 flex justify-end -mr-5 sm:mr-10 -mt-2 sm:mt-5">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Link href="github">
            <GitHubLogoIcon className="h-5 sm:h-6 w-5 sm:w-6" />
          </Link>
          <Link href="instagram">
            <InstagramLogoIcon className="h-5 sm:h-6 w-5 sm:w-6" />
          </Link>
          <Link href="x">
            <TwitterLogoIcon className="h-5 sm:h-6 w-5 sm:w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
