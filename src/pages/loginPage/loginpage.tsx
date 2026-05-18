import { Link } from 'react-router-dom';
import styles from './style.module.css';
import image from '../../assets/image.png';
import logo from '../../assets/logo.png';
import googleLogo from '../../assets/googleLogo.png';
import { loginSchema } from '../../schemas/login.schema';
import type { LoginFormData } from '../../schemas/login.schema';
import { useState, type FormEvent } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { setPersistence, browserLocalPersistence, browserSessionPersistence,  } from 'firebase/auth';

const Login = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        const result = loginSchema.safeParse(formData);
        setLoading(true);
        if (!result.success) {
            const fields = result.error.flatten(issue => issue.message).fieldErrors;
            setError(Object.values(fields).flat()[0] ?? 'Invalid input.');
            setLoading(false);
            return;
        } else {
            const userLogin = async () => {
                try {
                    await setPersistence(
                        auth,
                        rememberMe
                            ? browserLocalPersistence
                            : browserSessionPersistence
                    )
                    const response = await signInWithEmailAndPassword(
                        auth,
                        formData.email,
                        formData.password
                    )
                    if (response) {
                        navigate('/chat')
                    }
                } catch (err) {
                    setError((err as Error).message);
                } finally {
                    setLoading(false)
                }
            }
            userLogin()
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user
            if (user.emailVerified) {
                setLoading(true)
                window.alert('Login Successful')
                const userInfo = [user.displayName, user.email, user.phoneNumber, user.photoURL]
                console.log(userInfo);
                navigate('/chat')
            }
        } catch (error) {
            throw new Error((error as Error).message)
        } finally {
            setLoading(false)
        }
    };


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

                    <button className={styles.googleBtn}
                        disabled={loading}
                        onClick={handleGoogleLogin}
                    >
                        <img src={googleLogo} alt="Google logo" className={styles.googleIcon} />
                        Continue with Google
                    </button>

                    <div className={styles.divider}>
                        <span className={styles.dividerLine} />
                        <span className={styles.dividerText}>or Sign in with Email</span>
                        <span className={styles.dividerLine} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label className={styles.label}>Email</label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="mail@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({
                                ...formData,
                                email: e.target.value
                            })}
                        />

                        <label className={styles.label}>Password</label>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="••••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({
                                ...formData,
                                password: e.target.value
                            })}
                        />

                        <div className={styles.row}>
                            <label className={styles.rememberMe}>
                                <input type="checkbox"
                                    className={styles.checkbox}
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                Remember Me
                            </label>
                            <Link to="/forgot-password" className={styles.forgotPassword}>Forgot Password?</Link>
                        </div>

                        {error && <p className={styles.error}>{error}</p>}

                        <button className={styles.loginBtn}
                            disabled={loading}
                        >{loading ? 'Logging in...' : 'Login'}</button>
                    </form>
                    <p className={styles.registerRow}>
                        Not Registered Yet?&nbsp;
                        <Link to="/register" className={styles.createAccount}>Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
