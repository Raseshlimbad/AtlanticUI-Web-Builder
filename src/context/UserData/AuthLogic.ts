import { SignJWT, jwtVerify } from "jose";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { UserState } from "./UserProvider";
import process from "process";

const key = new TextEncoder().encode(process.env.NEXT_PUBLIC_ENCRYPTION);

//IF IN PRODUCTION TRUE
const httpOnlyStatus = false;
// In Seconds
const sessionLimit = 60 * 60 * 24;

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(currentState: UserState) {
  // Verify credentials && get the user

  const state = currentState;

  // Create the session

  const expires = new Date(Date.now() + sessionLimit * 1000);
  const session = await encrypt({ state, expires });

  // Save the session in a cookie
  setCookie("session", session, {
    maxAge: sessionLimit,
    httpOnly: httpOnlyStatus,
  });
}

export async function updateCookie(newState: UserState) {
  // Verify credentials && get the user

  const state = newState;

  // Create the session
  const expires = new Date(Date.now() + sessionLimit * 1000);
  const session = await encrypt({ state, expires });

  // Save the session in a cookie
  setCookie("session", session, {
    maxAge: sessionLimit,
    httpOnly: httpOnlyStatus,
  });
}

export async function logout() {
  // Destroy the session
  deleteCookie("session");
}

export async function getSession() {
  const session = getCookie("session");

  if (!session) return null;
  return await decrypt(session);
}

// export async function updateCookie(request: any) {
//   const session = request.cookies.get("session")?.value;
//   if (!session) return;

//   // Refresh the session so it doesn't expire
//   const parsed = await decrypt(session);
//   parsed.expires = new Date(Date.now() + 10 * 1000);
//   const res = NextResponse.next();
//   res.cookies.set({
//     name: "session",
//     value: await encrypt(parsed),
//     httpOnly: true,
//     expires: parsed.expires,
//   });
//   return res;
// }
