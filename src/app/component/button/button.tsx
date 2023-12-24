import { useSession, signIn, signOut } from "next-auth/react";

export function SignOutBtn() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
