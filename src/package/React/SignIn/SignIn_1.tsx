import Image from "next/image";
import Logo from "@/assets/logo.png";
import {
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
  Copyright,
} from "@phosphor-icons/react/dist/ssr";
import { ReactElement } from "react";

export default function SignIn_1() {
  return <>{SignInElement_1} </>;
}

export const SignInElement_1: ReactElement = (
  <div className="flex h-screen w-full items-center justify-center bg-aui_primary">
    <div className="flex h-full w-[40%] flex-col items-center justify-center bg-[url('../assets/Background.svg')] bg-contain bg-center bg-no-repeat">
      <div className="flex w-3/4 flex-col gap-4">
        <h1 className="text-5xl font-bold text-textPrimary">Welcome Back</h1>
        <span className="text-2xl font-normal text-textPrimary">
          Sign in to start creating your dream website. A low code kickstart to
          develop your websites faster.
        </span>
      </div>
    </div>
    <div className="flex h-full w-[60%] items-center justify-center">
      <div className="min-w-[50%] max-w-[30rem]">
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="username" className="text-lg text-textPrimary">
            Email
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            className="focus:ring-primary-200 block h-12 w-full rounded-md border-2 px-4 shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <div className="mt-6 flex w-full flex-col gap-2">
          <label htmlFor="password" className="text-lg text-textPrimary">
            Password
          </label>
          <input
            type="Password"
            placeholder="Password"
            className="focus:ring-primary-200 block h-12 w-full rounded-md border-2 px-4 shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <div className="mt-4 flex gap-2">
          <input type="checkbox" name="" id="" />
          <span>Remember me</span>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <button className="flex h-12 w-full items-center justify-center rounded-md bg-primary text-center text-textComplementary hover:bg-primaryHover ">
            Sign In
          </button>

          <span className="text-accent underline">Forget Password?</span>
          <p>
            {"Don't have an account?"}
            <a href={"/signup"} className="text-accent underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const SignInCode_1 = `  <div className="flex h-screen w-full items-center justify-center bg-aui_primary">
<div className="flex h-full w-[40%] flex-col items-center justify-center bg-[url('../assets/Background.svg')] bg-contain bg-center bg-no-repeat">
  <div className="flex w-3/4 flex-col gap-4">
    <h1 className="text-5xl font-bold text-textPrimary">Welcome Back</h1>
    <span className="text-2xl font-normal text-textPrimary">
      Sign in to start creating your dream website. A low code kickstart to
      develop your websites faster.
    </span>
  </div>
</div>
<div className="flex h-full w-[60%] items-center justify-center">
  <div className="w-[50%]">
    <div className="flex w-full flex-col gap-2">
      <label htmlFor="username" className="text-lg text-textPrimary">
        Email
      </label>
      <input
        type="email"
        placeholder="you@email.com"
        className="focus:ring-primary-200 block h-12 w-full rounded-md border-2 px-4 shadow-sm focus:ring focus:ring-opacity-50"
      />
    </div>
    <div className="mt-6 flex w-full flex-col gap-2">
      <label htmlFor="password" className="text-lg text-textPrimary">
        Password
      </label>
      <input
        type="Password"
        placeholder="Password"
        className="focus:ring-primary-200 block h-12 w-full rounded-md border-2 px-4 shadow-sm focus:ring focus:ring-opacity-50"
      />
    </div>
    <div className="mt-4 flex gap-2">
      <input type="checkbox" name="" id="" />
      <span>Remember me</span>
    </div>
    <div className="mt-6 flex flex-col gap-4">
      <button className="flex h-12 w-full items-center justify-center rounded-md bg-primary text-center text-textComplementary hover:bg-primaryHover ">
        Sign In
      </button>

      <span className="text-accent underline">Forget Password?</span>
      <p>
        {"Don't have an account?"}
        <a href={"/signup"} className="text-accent underline">
          Sign Up
        </a>
      </p>
    </div>
  </div>
</div>
</div>`;
