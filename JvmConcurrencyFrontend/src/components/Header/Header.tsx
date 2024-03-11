import styles from "./Header.module.css";

function Header() {
  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <span className={styles.made}>made by</span>
          <a
            href="https://github.com/scottyroges"
            target="_blank"
            className={styles.scott}
          >
            Scott Rogener
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Header;
