import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/config";
import styles from "./style.module.css";
import recovery from "../../assets/recovery.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const handleResetPassword = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch {
      // Silently ignore errors — with Email Enumeration Protection enabled,
      // we must not reveal whether the email exists in our system.
    } finally {
      setSent(true);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={recovery} alt="password recovery" className={styles.coverImage} />
      </div>

      <div className={styles.rightSide}>
        <div className={styles.formWrapper}>
          {!sent ? (
            <>
              <div className={styles.iconWrap}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7c3d52" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h2 className={styles.title}>Forgot Password?</h2>
              <p className={styles.subtitle}>
                No worries — enter your email and we'll send you a reset link.
              </p>

              <label className={styles.label}>Email Address</label>
              <input
                className={styles.input}
                type="email"
                placeholder="mail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
              />

              <button
                className={styles.submitBtn}
                onClick={handleResetPassword}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Email"}
              </button>

            </>
          ) : (
            <>
              <div className={styles.successIcon}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#7c3d52" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.28 16z" />
                </svg>
              </div>
              <h2 className={styles.title}>Check your inbox</h2>
              <p className={styles.subtitle}>
                We sent a reset link to <strong className={styles.emailHighlight}>{email}</strong>
              </p>
              <p className={styles.hint}>Didn't receive it? Check your spam folder or try again.</p>

              <button
                className={styles.submitBtn}
                onClick={() => { setSent(false); setEmail(""); }}
              >
                Try a different email
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
