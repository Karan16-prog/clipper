import { AddLink } from "../add/addLink";
import { SignOutBtn } from "../button/button";
import styles from "./navbar.module.css";
export default function NavBar() {
  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <nav>
          <div>
            {/* logo */}
            <span>Logo</span>
          </div>

          <div
            style={{
              flexGrow: 1,
            }}
          >
            <AddLink />
          </div>

          <div>
            <SignOutBtn />
          </div>
        </nav>
      </div>
    </div>
  );
}
