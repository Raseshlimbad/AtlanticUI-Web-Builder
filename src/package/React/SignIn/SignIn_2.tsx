import Image from "next/image";
import Logo from "@/assets/logo.png";
import {
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
  Copyright,
} from "@phosphor-icons/react/dist/ssr";
import { ReactElement } from "react";

export default function SignIn_2() {
  return <>{SignInElement_2} </>;
}

export const SignInElement_2: ReactElement = (
  <div className="flex h-screen w-full items-center justify-center bg-aui_primary">
    <div className="flex h-full w-[60%] items-center justify-center">
      <div className="w-3/4">
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

export const SignInCode_2 = `  <div className="flex h-screen w-full items-center justify-center bg-aui_primary">
<div className="flex h-full w-[60%] items-center justify-center">
  <div className="w-3/4">
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
