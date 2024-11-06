import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Auth.module.css";

function Auth() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(""); // Clear the error message when input changes
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the email
    if (!email.endsWith("@lpnu.ua")) {
      setError("Ви не належите до цієї організації");
    } else {
      setError(""); // Clear the error if the email is valid
      // Proceed with authentication logic here
      console.log("Logged in successfully with email:", email);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Авторизація</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className={styles.input}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.inputGroup}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Увійти
        </button>
      </form>
    </div>
  );
}

export default Auth;
