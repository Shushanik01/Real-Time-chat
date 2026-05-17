import styles from './style.module.css';
import reg from '../../assets/reg.png';

const Registration = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <img src={reg} alt="registration" className={styles.coverImage} />
            </div>
            <div className={styles.rightSide}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.title}>Create an Account</h2>
                    <p className={styles.subtitle}>Join us — it only takes a minute</p>

                    <div className={styles.nameRow}>
                        <div className={styles.fieldGroup}>
                            <label className={styles.label}>First Name</label>
                            <input className={styles.input} type="text" placeholder="Name" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label className={styles.label}>Last Name</label>
                            <input className={styles.input} type="text" placeholder="Surname" />
                        </div>
                    </div>

                    <label className={styles.label}>Email Address</label>
                    <input className={styles.input} type="text" placeholder="mail@example.com" />

                    <label className={styles.label}>Phone Number</label>
                    <input className={styles.input} type="number" placeholder="+374" />

                    <label className={styles.label}>Username</label>
                    <input className={styles.input} type="text" placeholder="username" />

                    <label className={styles.label}>Password</label>
                    <input className={styles.input} type="password" placeholder="••••••••••" />

                    <label className={styles.label}>Confirm Password</label>
                    <input className={styles.input} type="password" placeholder="••••••••••" />

                    <button className={styles.registerBtn}>Register</button>

                    <p className={styles.loginRow}>
                        Already have an account?&nbsp;
                        <a href="#" className={styles.loginLink}>Log in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
