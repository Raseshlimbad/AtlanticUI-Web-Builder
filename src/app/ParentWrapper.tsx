"use client";
import UserProvider from "@/context/UserData/UserProvider";

export default function ParentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
