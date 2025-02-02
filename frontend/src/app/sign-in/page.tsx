import Logo from "@/src/components/logo";
import SignInForm from "@/src/components/sign-in/sign-in-form";
import { CardFooter } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import Link from "next/link";
import { Metadata } from "next";
import PolicyFooter from "@/src/components/policy-footer";

export const metadata: Metadata = {
  title: "Sign In | Taskly",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex justify-center w-full items-center rounded-lg p-5 ">
          <Logo />
        </div>
        <Separator className="mt-4 mb-5" />

        <SignInForm />

        <CardFooter className="text-muted-foreground items-center justify-center mt-4 mb-4 text-xs">
          No account?
          <Link href="/sign-up" className="px-1.5 underline text-blue-400">
            Sign Up
          </Link>
        </CardFooter>

        <PolicyFooter />
      </div>
    </main>
  );
}
