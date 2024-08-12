"use client";
import Link from "next/link";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { ButtonsCard } from "../ui/tailwindcss-buttons";

export function TailwindcssButtons() {
    navigator.clipboard
      .writeText('text')
      .then(() => {
        console.log("Text copied to clipboard:");
        // toast.success("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Error copying text to clipboard:", err);
        // toast.error("Error copying to clipboard");
      });
};

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
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <TypewriterEffectSmooth words={words} />
        <div className="pb-40 px-4 w-full flex gap-x-2 justify-center">
          {buttons.map((button, idx) => (
            <div key={idx}>
              <Link href={button.href}>
                {button.component}
              </Link>
            </div>
          ))}
        </div>
    </div>
  );
}

export const buttons = [
  {
    name: "Join Us",
    description: "Shimmer button for your website",
    showDot: false,
    href: "/register",
    component: (
      <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        Join us
      </button>
    ),
  },
  {
    name: "Business?",
    description: "Shimmer button for your website",
    showDot: false,
    href: "/business", // Add the specific href for this button
    component: (
      <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Business?
      </button>
    ),
  },
];
