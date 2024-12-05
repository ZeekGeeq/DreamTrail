import React from 'react';
import styles from './Login.module.css';

const Login = () => (
  <div className={styles.loginContainer}>
    <h1 className={styles.welcomeText}>Welcome</h1>
    <a href="http://localhost:5000/api/auth/google" className={styles.googleButton}>
      <img
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        alt="Google icon"
        className={styles.googleIcon}
      />
      Login with Google
    </a>
  </div>
);

export default Login;
