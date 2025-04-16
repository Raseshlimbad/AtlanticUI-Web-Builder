"use client";

import HeroImg from "@/assets/heroImg.png";
import { useUser } from "@/context/UserData/UserProvider";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const { userState } = useUser();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center bg-[url('../assets/Background.svg')]	bg-center bg-no-repeat px-8 py-20 text-center">
      <span className="mb-6 flex items-center justify-center gap-3 rounded-full border border-neutral-800 bg-neutral-500/10 px-4 py-2 text-xs md:text-sm">
        <AlertTriangle className="hidden size-5 sm:block" />
        Please view this website on a larger screen.
      </span>
      <h1 className=" mb-4 text-5xl font-bold text-textPrimary">
        A website builder for developers
      </h1>
      <span className="mb-10 text-2xl font-medium text-textSecondary">
        One stop destination to build Tailwind styled components instantly.
        Login to get started.
      </span>
      <Link
        className="mb-20 flex h-10 w-32 items-center justify-center rounded-md bg-primary text-center text-textComplementary hover:bg-primaryHover "
        href={userState?.loginStatus ? "/dashboard" : "/signin"}
      >
        Get Started
      </Link>

      <div className="hidden w-3/4 overflow-hidden rounded-xl border border-neutral-300 bg-neutral-500/10 p-4 md:block">
        <div className="overflow-hidden rounded-xl border border-neutral-300 shadow-lg">
          <Image src={HeroImg} alt="Hero Image" />
        </div>
      </div>
    </div>
  );
}
