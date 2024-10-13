import { CardFooter } from "@/src/components/ui/card";
import Link from "next/link";

export default function PolicyFooter() {
  return (
    <CardFooter className="text-muted-foreground flex items-center justify-center mt-4 mb-4 text-xs">
      <Link
        href="/terms-of-service"
        className="px-1.5 hover:underline text-blue-400"
      >
        Terms of Service
      </Link>
      |
      <Link
        href="/privacy-policy"
        className="px-1.5 hover:underline text-blue-400"
      >
        Privacy Policy
      </Link>
    </CardFooter>
  );
}
