import { signIn } from "@/auth";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button type="submit">
        Signin with GitHub
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </button>
    </form>
  );
}
