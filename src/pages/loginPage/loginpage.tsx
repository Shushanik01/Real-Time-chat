import styles from './style.module.css';
import image from '../../assets/image.png';
import logo from '../../assets/logo.png';
import googleLogo from '../../assets/googleLogo.png';
import { loginSchema } from '../../schemas/login.schema';
import type { LoginFormData } from '../../schemas/login.schema';
import { useState, type FormEvent } from 'react';
import {  GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import {auth, googleProvider} from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });

    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            console.error(result.error.flatten(issue => issue.message).fieldErrors);
            return;
        } else{
           const userLogin = async()=>{
            try{
                const response = await signInWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                )
                if(response){
                    navigate('/chat')
                }
            } catch(error){
                console.log((error as Error).message);   
            }
           }
           userLogin()
        }
        
    };

    const handleGoogleLogin = async()=>{
        try{
            const result = await signInWithPopup(auth, googleProvider);
            const user = await result.user
            const credentials = GoogleAuthProvider.credentialFromResult(result)
            const accessToken = credentials?.accessToken
            if(user.emailVerified){
                window.alert('Login Successful')
            const userInfo = [user.displayName, user.email, user.phoneNumber, user.photoURL]
                console.log(userInfo);
                navigate('/chat')
            }
        } catch(error){
            throw new Error((error as Error).message)
        }
    }

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
                    <form action="submit"
                        onSubmit={handleSubmit}
                    >
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
                                <input type="checkbox" className={styles.checkbox} />
                                Remember Me
                            </label>
                            <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
                        </div>

                        <button className={styles.loginBtn}
                        >Login</button>
                    </form>
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
