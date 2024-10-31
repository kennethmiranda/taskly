"use client";

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  IconBrandDiscordFilled,
  IconBrandGoogleFilled,
  IconFidgetSpinner,
} from "@tabler/icons-react";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    console.log(user);

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      signIn("credentials", {
        email: user.email,
        password: user.password,
        callbackUrl: "/home",
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex-1 rounded-lg px-6 pb-2 pt-8">
        <form onSubmit={handleSubmit}>
          <h2 className="font-bold -my-2 mb-8 text-2xl tracking-tight">
            Create a new account
          </h2>

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="w-full">
            <div className="mt-4 grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div className="mt-4 grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                disabled={isLoading}
              />
            </div>
          </div>

          <Button className="mt-4 mb-3 w-full" disabled={isLoading}>
            {isLoading ? (
              <IconFidgetSpinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Sign Up <ArrowRightIcon className="ml-auto h-5 w-5" />
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2">
          <Button
            variant="outline"
            onClick={() =>
              signIn("github", { callbackUrl: "http://localhost:3000/home" })
            }
            disabled={isLoading}
          >
            <GitHubLogoIcon className="ml-0 mx-3 h-5 w-5" />
            <span>GitHub</span>
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000/home" })
            }
            disabled={isLoading}
          >
            <IconBrandGoogleFilled size={20} className="ml-0 mx-3" />
            <span>Google</span>
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              signIn("discord", { callbackUrl: "http://localhost:3000/home" })
            }
            disabled={isLoading}
          >
            <IconBrandDiscordFilled size={20} className="ml-1 mx-3" />
            <span>Discord</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
