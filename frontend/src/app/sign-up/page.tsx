import Logo from "@/src/components/logo";
import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "@/auth";
import { AuthError } from "next-auth";
import { Button } from "@/src/components/ui/button";
import { ThemeToggle } from "@/src/components/ui/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Icons } from "@/src/components/icons";
import { Separator } from "@/src/components/ui/separator";
import SignUpForm from "@/src/components/sign-up/sign-up-form";
import Link from "next/link";

export const metadata = {
  title: "Sign Up | Task Manager and Cloud Storage System",
  description: "Create a new account",
};

export default async function SignUpPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex mx-2 w-full items-center rounded-lg p-5 ">
          <Logo />
        </div>
        <Separator className="mt-4 mb-5 -mx-2" />
        <div className="flex flex-col gap-5">
          <SignUpForm />
        </div>
        <CardFooter className="text-muted-foreground items-center justify-center text-xs">
          Already have an account?
          <Link href="/sign-in" className="px-1.5 underline text-blue-400">
            Sign In
          </Link>
        </CardFooter>

        {/* Theme Toggle for testing, remove in production */}
        <ThemeToggle />
      </div>
    </main>
  );
}
