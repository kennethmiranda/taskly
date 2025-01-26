import { lusitana } from "@/src/components/fonts";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-theme`}
    >
      <CheckCircledIcon className="h-12 w-12 rotate-[-5deg] " />
      <p className="text-[40px] px-2">Taskly</p>
    </div>
  );
}
