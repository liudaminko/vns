import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { useTranslation } from "react-i18next";

interface TwoFactorAuthProps {
  onVerify: (token: string, userId: string) => void;
}

const Auth: React.FC<TwoFactorAuthProps> = ({ onVerify }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"login" | "verify">("login");
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResendDisabled && step === "verify") {
      timer = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      if (resendTimer === 0) {
        setIsResendDisabled(false);
        clearInterval(timer);
      }
    }
    return () => clearInterval(timer);
  }, [isResendDisabled, resendTimer, step]);

  const handleCodeSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/verify-2fa",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        onVerify(data.token, data.userId);
        setMessage(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        navigate("/");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error");
    }
  };

  const handleLoginSubmit = async () => {
    if (!email.endsWith("@lpnu.ua")) {
      setMessage("Email must end with @lpnu.ua");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setStep("verify");
        setMessage(data.message);
        setIsResendDisabled(true);
        setResendTimer(30);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error");
    }
  };

  const handleResendCode = async () => {
    setIsResendDisabled(true);
    setResendTimer(30);

    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/resend-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Verification code resent to your email");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Failed to resend code. Try again.");
    }
  };

  return (
    <div className={styles.twoFactorContainer}>
      <div className={styles.authBackground}></div>
      <div className={styles.authBackgroundShape}></div>
      {step === "login" ? (
        <div className={styles.authForm}>
          <h2 className={styles.logInTitle}>{t("login")}</h2>
          <h3>{t("login_note")}</h3>
          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
          <button onClick={handleLoginSubmit} className={styles.verifyButton}>
            {t("login")}
          </button>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      ) : (
        <div>
          <h2>Two-Factor Authentication</h2>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className={styles.codeInput}
          />
          <button onClick={handleCodeSubmit} className={styles.verifyButton}>
            Verify Code
          </button>
          <button
            onClick={handleResendCode}
            className={styles.resendButton}
            disabled={isResendDisabled}
          >
            {isResendDisabled ? `Resend in ${resendTimer}s` : "Resend Code"}
          </button>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Auth;
