import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/config";
import styles from "./style.module.css";
import recovery from "../../assets/recovery.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResetPassword = async () => {
    setError("");

    if (!email) {
      setError("Please provide email");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);

      setSent(true);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img
          src={recovery}
          alt="password recovery"
        />
      </div>

      <div className={styles.rightSide}>
        <span>Forgot Password?</span>

        {!sent ? (
          <>
            <p>
              Enter your email to reset your password
            </p>

            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Reset Email"}
            </button>

            {error && (
              <p style={{ color: "red" }}>
                {error}
              </p>
            )}
          </>
        ) : (
          <div>
            <p> Reset email sent!</p>
            <p>
              Check your inbox:{" "}
              <strong>{email}</strong>
            </p>

            <button
              onClick={() => {
                setSent(false);
                setEmail("");
                setError("");
              }}
            >
              Send again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;