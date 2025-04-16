/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useUser } from "@/context/UserData/UserProvider";
import { BACKEND_URL, HEADER_CONFIG } from "@/utils/utils";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { UserRegisterFields } from "../api/users/route";
import { Loader2 } from "lucide-react";
// import { auth, provider, signInWithPopup } from "@/firebase";

export default function SignUp() {
  const [passType, setPassType] = useState<"password" | "text">("password");

  const { userState, dispatchUserState } = useUser();
  const router = useRouter();

  const [username, setUsername] = useState<string | null>();
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const [password, setPassword] = useState<string | null>();
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [name, setName] = useState<string | null>();
  const [nameError, setNameError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userState.loginStatus) {
      router.push("/");
    }
  }, []);
  const handleNameChange = (name: string) => {
    setNameError(null);

    var validRegex: RegExp = new RegExp(/[a-zA-Z]/g);
    var validRegex_space: RegExp = new RegExp(/[\s]/g);
    if (name === undefined || name === "") {
      setNameError("Name must not be empty");
    }
    if (name.match(validRegex) && !name.match(validRegex)) {
      setNameError("Name must not be empty");
    }
    if (!name.match(validRegex)) {
      setNameError("Please enter a valid name");
    } else setName(name);
  };
  //EMAIL VALIDATION ALONG WITH STORING
  const handleUsernameChange = (val: string) => {
    setUsernameError(null);
    if (val === "" || val === undefined) {
      setUsernameError("Please enter a valid Email");
    } else setUsername(val);

    const isValid: Boolean = validateEmail(val);
    if (isValid === false) setUsernameError("Please enter a valid Email");
  };

  const validateEmail = (email: string) => {
    var validRegex: RegExp = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    );

    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };

  //PASSWORD VALIDATION ALONG WITH STORING
  const handlePasswordChange = (val: string) => {
    setPasswordError(null);
    setPassword(val);
    validatePassword(val);
  };

  const validatePassword = (email: string) => {
    //Uppercase
    var validRegex_uppercase = new RegExp(/[A-Z]/g);
    //Lowercase
    var validRegex_lowercase = new RegExp(/[a-z]/g);
    //Numeric
    var validRegex_numeric = new RegExp(/[0-9]/g);
    //Special Characters
    var validRegex_special = new RegExp(/[~!@#$%^*\-_=+[{\]}\/;:,.?]/g);

    //Space
    var validRegex_space = new RegExp(/[\s]/g);
    if (
      email.length >= 8 &&
      email.match(validRegex_uppercase) &&
      email.match(validRegex_lowercase) &&
      email.match(validRegex_numeric) &&
      email.match(validRegex_special) &&
      !email.match(validRegex_space)
    ) {
      setPasswordError(null);
    } else {
      var passwordErrorMsg: string = "Password must";
      var errCount: number = 0;

      if (email.length < 8) {
        passwordErrorMsg = passwordErrorMsg.concat(
          " ",
          "be atleat 8 characters",
        );

        errCount++;
      }
      if (email.match(validRegex_space)) {
        if (errCount > 0) {
          passwordErrorMsg = passwordErrorMsg.concat(" ", ",");
        }
        passwordErrorMsg = passwordErrorMsg.concat(" ", "not contain a space");
        errCount++;
      }

      if (!email.match(validRegex_uppercase)) {
        if (errCount > 0) {
          passwordErrorMsg = passwordErrorMsg.concat(" ", ",");
        }
        passwordErrorMsg = passwordErrorMsg.concat(
          " ",
          "contain an uppercase character",
        );
        errCount++;
      }
      if (!email.match(validRegex_lowercase)) {
        if (errCount > 0) {
          passwordErrorMsg = passwordErrorMsg.concat(" ", ",");
        }
        passwordErrorMsg = passwordErrorMsg.concat(
          " ",
          "contain a lowercase character",
        );
        errCount++;
      }
      if (!email.match(validRegex_numeric)) {
        if (errCount > 0) {
          passwordErrorMsg = passwordErrorMsg.concat(" ", ",");
        }
        passwordErrorMsg = passwordErrorMsg.concat(
          " ",
          "contain a numeric character",
        );
        errCount++;
      }
      if (!email.match(validRegex_special)) {
        if (errCount > 0) {
          passwordErrorMsg = passwordErrorMsg.concat(" ", "and");
        }
        passwordErrorMsg = passwordErrorMsg.concat(
          " ",
          "contain a special character like (@,%,$,etc.).",
        );
        errCount++;
      }

      setPasswordError(passwordErrorMsg);
    }
  };

  //SignIn
  const handleSignUp = () => {
    setIsLoading(true);
    if (
      !usernameError &&
      !passwordError &&
      !nameError &&
      name &&
      username &&
      password
    ) {
      handleSignUpLogic();
    } else {
      if (!password) {
        setPasswordError("Please enter a valid Password");
      }
      if (!username) {
        setUsernameError("Please enter a valid Email");
      }
      if (!name) {
        setNameError("Please enter a valid Name");
      }
    }
  };

  //SIGNUP LOGIC
  const handleSignUpLogic = async () => {
    if (name && username && password) {
      const Payload: UserRegisterFields = {
        userID: v4(),
        name: name,
        email: username,
        password: password,
        projects: [],
      };
      const response = await axios.post(
        `${BACKEND_URL}/users`,
        Payload,
        HEADER_CONFIG,
      );

      if (response.data.status === true) {
        handleAnalyticsUpdate();
        const resp = dispatchUserState({
          type: "LOGIN",
          payload: { data: response.data.data },
        });

        router.push("/dashboard");
      }
    } else {
      if (!password) {
        setPasswordError("Please enter a valid Password");
      }
      if (!username) {
        setUsernameError("Please enter a valid Email");
      }
      if (!name) {
        setNameError("Please enter a valid Name");
      }
    }

    setIsLoading(false);
  };

  const handleAnalyticsUpdate = async () => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/analytics?analyticsId=${process.env.NEXT_PUBLIC_ANALYTICS_KEY}`,
        HEADER_CONFIG,
      );
    } catch (error) {
      console.error(error);
    }
  };

    // Handle Google Sign-In
    // const handleGoogleSignIn = async () => {
    //   try {
    //     setIsLoading(true);
    //     const result = await signInWithPopup(auth, provider);
    //     const user = result.user;

    //       // Get the Google ID token from the signed-in user
    //      const googleIdToken = await user.getIdToken();

    //      console.log("Google ID Token:", googleIdToken);
    
    //     const Payload: UserRegisterFields = {
    //       userID: v4(),
    //       name: user.displayName ?? "Google User", // You can customize the user name handling
    //       email: user.email ?? "",
    //       password: "", // No password is required here, as it's managed by Firebase
    //       projects: [],
    //       googleIdToken: googleIdToken,   
    //     };
  
    //     // Proceed with your existing user registration or login logic
    //     const response = await axios.post(
    //       `${BACKEND_URL}users`,
    //       Payload,
    //       HEADER_CONFIG,
    //     );
  
    //     if (response.data.status === true) {
    //       handleAnalyticsUpdate();
    //       dispatchUserState({
    //         type: "LOGIN",
    //         payload: { data: response.data.data },
    //       });
  
    //       router.push("/dashboard");
    //     }
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error("Google Login Error:", error);
    //     setIsLoading(false);
    //   }
    // };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full w-[40%] flex-col items-center justify-center bg-[url('../assets/Background.svg')] bg-contain bg-center bg-no-repeat">
        <div className="flex w-3/4 flex-col gap-4">
          <h1 className="text-5xl font-bold text-textPrimary">Welcome</h1>
          <span className="text-2xl font-normal text-textPrimary">
            Sign up to start creating your dream website. A low code kickstart
            to develop your websites faster.
          </span>
        </div>
      </div>
      <div className="flex h-full w-[60%] items-center justify-center">
        <div className="w-[50%]">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="name" className="text-lg text-textPrimary">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className={clsx(
                "block h-12 w-full rounded-md border-2 px-4 shadow-sm",
                {
                  "border-red-600 focus:border-red-600 focus:ring focus:ring-red-600 focus:ring-opacity-50":
                    nameError !== null,
                  "focus:ring-primary-200 focus:ring focus:ring-opacity-50":
                    nameError === null,
                },
              )}
              onChange={(e) => {
                handleNameChange(e.target.value);
              }}
            />
            {nameError !== null ? (
              <span className="text-sm font-normal text-red-600">
                {nameError}
              </span>
            ) : null}
          </div>
          <div className="mt-6 flex w-full flex-col gap-2">
            <label htmlFor="username" className="text-lg text-textPrimary">
              Email
            </label>
            <input
              type="text"
              placeholder="you@email.com"
              className={clsx(
                "block h-12 w-full rounded-md border-2 px-4 shadow-sm",
                {
                  "border-red-600 focus:border-red-600 focus:ring focus:ring-red-600 focus:ring-opacity-50":
                    usernameError !== null,
                  "focus:ring-primary-200 focus:ring focus:ring-opacity-50":
                    usernameError === null,
                },
              )}
              onChange={(e) => {
                handleUsernameChange(e.target.value);
              }}
            />
            {usernameError !== null ? (
              <span className="text-sm font-normal text-red-600">
                {usernameError}
              </span>
            ) : null}
          </div>
          <div className="mt-6 flex w-full flex-col gap-2">
            <label htmlFor="password" className="text-lg text-textPrimary">
              Password
            </label>
            <input
              type={passType}
              placeholder="Password"
              className={clsx(
                "block h-12 w-full rounded-md border-2 px-4 shadow-sm",
                {
                  "border-red-600 focus:border-red-600 focus:ring focus:ring-red-600 focus:ring-opacity-50":
                    passwordError !== null,
                  "focus:ring-primary-200 focus:ring focus:ring-opacity-50":
                    passwordError === null,
                },
              )}
              onChange={(e) => {
                handlePasswordChange(e.target.value);
              }}
            />
            {passwordError !== null ? (
              <span className="text-sm font-normal text-red-600">
                {passwordError}
              </span>
            ) : null}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              type="checkbox"
              name=""
              id=""
              onChange={(e) => {
                setPassType(e.target.checked ? "text" : "password");
              }}
            />
            <span>Show Password</span>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <button
              className="flex h-12 w-full items-center justify-center rounded-md bg-primary text-center text-textComplementary hover:bg-primaryHover "
              onClick={handleSignUp}
            >
              {isLoading ? (
                <Loader2 className="size-6 animate-spin" />
              ) : (
                "Sign Up"
              )}
            </button>
{/* 
            <button
              onClick={handleGoogleSignIn}
              className="flex h-12 w-full items-center justify-center rounded-md bg-blue-600 text-textComplementary hover:bg-blue-700 mt-4"
            >
              Sign Up with Google
            </button> */}

            <p>
              Have an account?{" "}
              <Link href={"/signin"} className="text-accent underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
