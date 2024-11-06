import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>Created by:</p>
        <ul className={styles.studentList}>
          <li>Гук А. М.</li>
          <li>Мина М. А.</li>
          <li>Міньковець Л. В.</li>
          <li>Мороз В. О.</li>
        </ul>
      </div>
      <nav className={styles.footerNav}>
        <Link to="/home" className={styles.navLink}>
          Home
        </Link>
        <Link to="/about" className={styles.navLink}>
          About
        </Link>
        <Link to="/contact" className={styles.navLink}>
          Contact
        </Link>
        <Link to="/support" className={styles.navLink}>
          Support
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
