import Logo from "@/src/components/logo";
import { CardFooter } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import SignUpForm from "@/src/components/sign-up/sign-up-form";
import Link from "next/link";
import { Metadata } from "next";
import PolicyFooter from "@/src/components/policy-footer";

export const metadata: Metadata = {
  title: "Sign Up | Taskly",
  description: "Create a new account",
};

export default async function SignUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex justify-center w-full items-center rounded-lg p-5 ">
          <Logo />
        </div>
        <Separator className="mt-4 mb-5" />

        <SignUpForm />

        <CardFooter className="text-muted-foreground items-center justify-center text-xs">
          Already have an account?
          <Link href="/sign-in" className="px-1.5 underline text-blue-400">
            Sign In
          </Link>
        </CardFooter>

        <PolicyFooter />
      </div>
    </main>
  );
}
