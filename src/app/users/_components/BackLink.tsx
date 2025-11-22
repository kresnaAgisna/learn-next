import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

export default function BackLink() {
  return (
    <Link
      href="/users"
      className="inline-flex items-center gap-1 text-gray-800 hover:text-black transition-colors"
    >
      <ArrowLeftIcon className="w-5 h-5 stroke-1" />
      Back to list
    </Link>
  );
}