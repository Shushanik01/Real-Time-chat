import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import styles from './style.module.css';
import reg from '../../assets/reg.png';

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

            await updateProfile(user, {
                displayName: `${formData.firstName} ${formData.lastName}`,
            });

            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                firstName: formData.firstName,
                lastName: formData.lastName,
                displayName: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                username: formData.username,
                createdAt: new Date(),
            });

            navigate('/login');
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <img src={reg} alt="registration" className={styles.coverImage} />
            </div>
            <div className={styles.rightSide}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.title}>Create an Account</h2>
                    <p className={styles.subtitle}>Join us — it only takes a minute</p>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.nameRow}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>First Name</label>
                                <input className={styles.input} type="text" placeholder="Name"
                                    value={formData.firstName} onChange={handleChange('firstName')} />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Last Name</label>
                                <input className={styles.input} type="text" placeholder="Surname"
                                    value={formData.lastName} onChange={handleChange('lastName')} />
                            </div>
                        </div>

                        <label className={styles.label}>Email Address</label>
                        <input className={styles.input} type="email" placeholder="mail@example.com"
                            value={formData.email} onChange={handleChange('email')} />

                        <label className={styles.label}>Phone Number</label>
                        <input className={styles.input} type="tel" placeholder="+374"
                            value={formData.phone} onChange={handleChange('phone')} />

                        <label className={styles.label}>Username</label>
                        <input className={styles.input} type="text" placeholder="username"
                            value={formData.username} onChange={handleChange('username')} />

                        <label className={styles.label}>Password</label>
                        <input className={styles.input} type="password" placeholder="••••••••••"
                            value={formData.password} onChange={handleChange('password')} />

                        <label className={styles.label}>Confirm Password</label>
                        <input className={styles.input} type="password" placeholder="••••••••••"
                            value={formData.confirmPassword} onChange={handleChange('confirmPassword')} />

                        {error && <p className={styles.error}>{error}</p>}

                        <button type="submit" className={styles.registerBtn} disabled={loading}>
                            {loading ? 'Creating account...' : 'Register'}
                        </button>
                    </form>

                    <p className={styles.loginRow}>
                        Already have an account?&nbsp;
                        <Link to="/login" className={styles.loginLink}>Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
