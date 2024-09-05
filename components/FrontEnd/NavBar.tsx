"use client";

import { useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react"; // Import useSession to check session
import { MainNav } from "../ui/main-nav";
import { MobileNav } from "../ui/mobile-nav";
import { ModeToggle } from "../ui/modetoggle";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter to handle redirection

export default function SiteHeader() {
  const { data: session, status } = useSession(); // Use session to check authentication status
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/login"); // Redirect to the login page
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/"); // Redirect to home after sign out
  };

  useEffect(() => {
    if (session) {
      // Redirect if logged in
      router.push("/");
    }
  }, [session, router]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="lg:hidden">
              <Link href={"/"}>
                <Image className="md:hidden" src="/Nala.png" alt="logo" width={40} height={40} />
              </Link>
            </div>
          </div>
          {status === "authenticated" ? (
            <button className="px-6 py-2 text-green-500 rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={handleSignOut}>
              Log Out
            </button>
          ) : (
            <button className="px-6 py-2 text-blue-500 rounded-lg font-bold transform hover:-translate-y-1 transition duration-400" onClick={handleSignIn}>
              Sign In
            </button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
