/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useUser } from "@/context/UserData/UserProvider";
import { BACKEND_URL, HEADER_CONFIG } from "@/utils/utils";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserLoginFields } from "../api/users/route";
import { Loader2 } from "lucide-react";

export default function SignIn() {
  const [passType, setPassType] = useState<"password" | "text">("password");
  const [username, setUsername] = useState<string | null>();
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [password, setPassword] = useState<string | null>();
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [processMessage, setProcessMessage] = useState<string | null>(null);

  //EMAIL VALIDATION ALONG WITH STORING
  const handleUsernameChange = (val: string) => {
    setUsernameError(null);
    setProcessMessage(null);

    if (val === "" || val === undefined) {
      setUsernameError("Please enter a valid Email");
    } else setUsername(val);

    const isValid: Boolean = validateEmail(val);
    if (isValid === false) setUsernameError("Please enter a valid Email");
  };

  const validateEmail = (email: string) => {
    var validRegex: RegExp = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
    setProcessMessage(null);

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
  const handleSignIn = () => {
    setIsLoading(true);
    if (!usernameError && !passwordError && username && password) {
      //Remove this
      handleLoginLogic();
    } else {
      if (!password) {
        setPasswordError("Please enter a valid Password");
      }
      if (!username) {
        setUsernameError("Please enter a valid Email");
      }
    }
  };
  const { userState, dispatchUserState } = useUser();
  const router = useRouter();
  //SIGNIN LOGIC
  const handleLoginLogic = async () => {
    if (!username || !password) return;
    const Payload: UserLoginFields = {
      email: username,
      password: password,
    };
    const resp = await axios.put(
      `${BACKEND_URL}/users/`,
      Payload,
      HEADER_CONFIG,
    );

    if (resp.data.status === true) {
      handleAnalyticsUpdate();
      dispatchUserState({
        type: "LOGIN",
        payload: {
          data: resp.data.data,
        },
      });
      router.push("/dashboard");
    } else {
      if (resp.data.msg === "INVALID_PASSWORD") {
        setProcessMessage("Invalid Password");
      } else if (resp.data.msg === "INVALID_EMAIL") {
        setProcessMessage(
          "Invalid Email. Please check correct email or create an account.",
        );
      }
    }
    setIsLoading(false);
  };

  const handleAnalyticsUpdate = async () => {
    try {
      await axios.put(
        `${BACKEND_URL}/analytics?analyticsId=${process.env.NEXT_PUBLIC_ANALYTICS_KEY}`,
        HEADER_CONFIG,
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (userState.loginStatus) {
      router.push("/");
    }
  }, []);
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Password_Helper
        setUsername={handleUsernameChange}
        setPassword={handlePasswordChange}
      />
      <div className="flex h-full w-[40%] flex-col items-center justify-center bg-[url('../assets/Background.svg')] bg-contain bg-center bg-no-repeat">
        <div className="flex w-3/4 flex-col gap-4">
          <h1 className="text-5xl font-bold text-textPrimary">Welcome Back</h1>
          <span className="text-2xl font-normal text-textPrimary">
            Sign in to start creating your dream website. A low code kickstart
            to develop your websites faster.
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
              value={username ? username : ""}
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
              value={password ? password : ""}
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
          {processMessage ? (
            <span className="mt-2 text-sm font-normal text-red-600">
              {processMessage}
            </span>
          ) : null}
          <div className="mt-6 flex flex-col gap-4">
            <button
              className="flex h-12 w-full items-center justify-center rounded-md bg-primary text-center text-textComplementary hover:bg-primaryHover "
              onClick={handleSignIn}
            >
              {isLoading ? (
                <Loader2 className="size-6 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>

            <p>
              {"Don't have an account?"}
              <Link href={"/signup"} className="text-accent underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Password_Helper = ({
  setPassword,
  setUsername,
}: {
  setPassword: (value: string) => void;
  setUsername: (value: string) => void;
}) => {
  const [modalStatus, setModalStatus] = useState<boolean>(true);

  const setDefaultCredentials = () => {
    setPassword("Admin@123");
    setUsername("admin@admin.com");
  };
  return (
    <>
      {modalStatus && (
        <div className="absolute bottom-6 right-6 flex min-h-20 flex-col gap-4 rounded-md border-[2px] border-neutral-300 bg-white px-4 py-4">
          <span className="text-lg font-medium">
            Add the default login credentials.
          </span>
          <button
            className="rounded-md border border-neutral-700 bg-neutral-900 px-4 py-2 text-textComplementary"
            onClick={setDefaultCredentials}
          >
            Add Credentials
          </button>
          <button
            className="rounded-md border border-neutral-900 px-4 py-2"
            onClick={() => setModalStatus(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};
