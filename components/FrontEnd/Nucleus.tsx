"use client";
import Link from "next/link";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function Typewriter() {
  const words = [
    {
      text: "Powered",
      className: "dark:text-gray-400",
    },
    {
      text: "By",
      className: "dark:text-gray-400",
    },
    {
      text: "NucleusDevs.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-blue-500 border dark:border-white border-transparent text-white text-sm">
        <Link href="/register">
          Join Now
          </Link>
        </button>
      </div>
    </div>
  );
}
