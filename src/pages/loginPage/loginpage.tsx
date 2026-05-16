import { Fragment } from "react/jsx-runtime";
import styles from './style.module.css';
import image from '../../assets/image.png';
import logo from '../../assets/logo.png';
import googleLogo from '../../assets/googleLogo.png'

const Login = () => {

    return(
        <Fragment>
            <div className={styles.leftSide}>
                <img src={image} alt="logo image" />
            </div>
            <div className={styles.rightSide}>
                <img src={logo} alt="logo" />
                <h3>Log In with your account</h3>
                <span>See what is going on with your business</span>
                <button> <img src={googleLogo} alt="Google logo" /> Continue with Google</button>
                <p>------- or sign in with Email -------</p>
                <label htmlFor="input">Email</label>
                <input type="text"
                placeholder="mail@example.com"
                />
                <label htmlFor="Password">Password</label>
                <input type="password" 
                placeholder="password"
                />
                <div className={styles.items}>
                    <input type="checkbox" />
                    <p>remember me</p>
                    <p>Forgot password?</p>
                </div>
                <button>Login</button>
                <span>
                    <p>Not registered yet?</p>
                    <p>Create an account</p>
                </span>
            </div>
        </Fragment>
    )
}
export default Login