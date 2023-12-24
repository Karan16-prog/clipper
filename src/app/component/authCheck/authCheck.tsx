"use client";

import { useSession } from "next-auth/react";
import { chdir } from "process";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    <>Please log in to see the content</>;
  }
}
