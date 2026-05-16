import styles from './style.module.css';
import image from '../../assets/image.png';
import logo from '../../assets/logo.png';
import googleLogo from '../../assets/googleLogo.png'

const Login = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <img src={image} alt="logo image" className={styles.sideImage} />
            </div>
            <div className={styles.rightSide}>
                <div className={styles.formWrapper}>
                    <img src={logo} alt="logo" className={styles.logo} />
                    <h2 className={styles.title}>Login to your Account</h2>
                    <p className={styles.subtitle}>See what is going on with your business</p>

                    <button className={styles.googleBtn}>
                        <img src={googleLogo} alt="Google logo" className={styles.googleIcon} />
                        Continue with Google
                    </button>

                    <div className={styles.divider}>
                        <span className={styles.dividerLine} />
                        <span className={styles.dividerText}>or Sign in with Email</span>
                        <span className={styles.dividerLine} />
                    </div>

                    <label className={styles.label}>Email</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="mail@example.com"
                    />

                    <label className={styles.label}>Password</label>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="••••••••••"
                    />

                    <div className={styles.row}>
                        <label className={styles.rememberMe}>
                            <input type="checkbox" className={styles.checkbox} />
                            Remember Me
                        </label>
                        <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
                    </div>

                    <button className={styles.loginBtn}>Login</button>

                    <p className={styles.registerRow}>
                        Not Registered Yet?&nbsp;
                        <a href="#" className={styles.createAccount}>Create an account</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
