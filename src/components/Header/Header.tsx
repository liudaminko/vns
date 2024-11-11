import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { User } from "../../mockUsers";
import { useTranslation } from "react-i18next";
import { useSidebar } from "../../SidebarContext";

interface HeaderProps {
  user: User | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const { t, i18n } = useTranslation();
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    if (user) {
      setDropdownVisible(!dropdownVisible);
    } else {
      navigate("/auth");
    }
  };

  const toggleLanguageDropdown = () =>
    setLanguageDropdownVisible(!languageDropdownVisible);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguageDropdownVisible(false);
  };

  const dropdownItems: { label: string; path: string }[] = (() => {
    switch (user?.role) {
      case "student":
        return [
          { label: t("user_profile"), path: "/profile" },
          { label: t("my_courses"), path: "/courses" },
          { label: t("grades"), path: "/grades" },
          { label: t("logout"), path: "/logout" },
        ];
      case "editor":
        return [
          { label: t("user_profile"), path: "/profile" },
          { label: t("edit_course"), path: "/edit-courses" },
          { label: t("reports"), path: "/reports" },
          { label: t("logout"), path: "/logout" },
        ];
      case "admin":
        return [
          { label: t("user_profile"), path: "/profile" },
          { label: t("user_management"), path: "/user-management" },
          { label: t("settings"), path: "/settings" },
          { label: t("logout"), path: "/logout" },
        ];
      default:
        return [];
    }
  })();

  const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    return (firstName[0] + (lastName ? lastName[0] : "")).toUpperCase();
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerLeft}>
        <button className={styles.burgerButton} onClick={toggleSidebar}>
          ☰
        </button>
        <Link to="/" className={styles.logoLink}>
          <img src="/logo.png" className={styles.logo} alt="logo" />
        </Link>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.languageSwitcher}>
          <button
            onClick={toggleLanguageDropdown}
            className={styles.languageButton}
          >
            {i18n.language.toUpperCase()}
          </button>
          {languageDropdownVisible && (
            <div className={styles.languageDropdown}>
              <button
                onClick={() => changeLanguage("en")}
                className={styles.language}
              >
                <img
                  src="/flags/en.png"
                  alt="English"
                  className={styles.flagIcon}
                />
                English
              </button>
              <button
                onClick={() => changeLanguage("uk")}
                className={styles.language}
              >
                <img
                  src="/flags/uk.png"
                  alt="Ukrainian"
                  className={styles.flagIcon}
                />
                Українська
              </button>
              <button
                onClick={() => changeLanguage("ger")}
                className={styles.language}
              >
                <img
                  src="/flags/ger.png"
                  alt="German"
                  className={styles.flagIcon}
                />
                Deutsch
              </button>
              <button
                onClick={() => changeLanguage("es")}
                className={styles.language}
              >
                <img
                  src="/flags/es.png"
                  alt="Spanish"
                  className={styles.flagIcon}
                />
                Español
              </button>
              <button
                onClick={() => changeLanguage("jp")}
                className={styles.language}
              >
                <img
                  src="/flags/jp.png"
                  alt="Japanese"
                  className={styles.flagIcon}
                />
                日本語
              </button>
            </div>
          )}
        </div>

        <div
          className={`${styles.userCompound} ${
            !user ? styles.grayUserCompound : ""
          }`}
          onClick={toggleDropdown}
        >
          {user ? (
            <>
              <span className={styles.userName}>{user.name}</span>
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className={styles.profilePic}
                />
              ) : (
                <div className={styles.initials}>{getInitials(user.name)}</div>
              )}
              <img
                src={dropdownVisible ? "/up.png" : "/down.png"}
                alt={dropdownVisible ? "Collapse" : "Expand"}
                className={styles.arrowIcon}
              />
            </>
          ) : (
            <span className={styles.userName}>{t("login")}</span>
          )}
        </div>

        {user && dropdownVisible && (
          <div className={styles.dropdownMenu} onClick={toggleDropdown}>
            {dropdownItems.map((item, index) => (
              <Link key={index} to={item.path} className={styles.dropdownItem}>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
