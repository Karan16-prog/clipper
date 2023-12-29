import { Session, getServerSession } from "next-auth";
import { AddLink } from "../add/addLink";
import { SignOutBtn } from "../button/button";
import styles from "./navbar.module.css";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function NavBar() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <nav>
          <div style={{ padding: "16px 0px 16px 0px" }}>
            {/* logo */}
            <p style={{ fontSize: "28px", margin: "0px" }}>Cluster</p>
          </div>

          <div
            style={{
              flexGrow: 1,
            }}
          >
            <AddLink session={session} />
          </div>
        </nav>
      </div>
    </div>
  );
}
