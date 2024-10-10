import { lusitana } from "@/src/components/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Title } from "@radix-ui/react-toast";
import { Icons } from "@/src/components/icons";

export default function SignUpForm() {
  return (
    <div className="flex-1 rounded-lg px-6 pb-2 pt-8">
      <Title className={`${lusitana.className} -my-2 mb-8 text-2xl`}>
        Create a new account
      </Title>
      <div className="w-full">
        <div className="mt-4 grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="mt-4 grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </div>
      <Button className="mt-4 mb-3 w-full">
        Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 " />
      </Button>
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
        <Button variant="outline">
          <Icons.gitHub className="mr-2 h-4 w-4" />
          Github
        </Button>
        <Button variant="outline">
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline">
          <Icons.discord className="mr-2 h-4 w-4" />
          Discord
        </Button>
      </div>
    </div>
  );
}
