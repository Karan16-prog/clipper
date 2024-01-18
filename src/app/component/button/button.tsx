"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./button.module.css";
export function SignOutBtn() {
  return (
    <button className={styles.btn} onClick={() => signOut()}>
      Logout
    </button>
  );
}

// export function DeleteBtn() {
//   return (
//     <>
//       <button id="showNumber">Show me</button>

//       <dialog id="delteArticle">
//         <form method="dialog">
//           <p>Do you want to delete this article?</p>
//           <button>Close dialog</button>
//         </form>
//       </dialog>
//     </>
//   );
// }
