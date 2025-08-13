import styles from './LoginForm.module.css';
import Logo from '../../components/Logo';

export default function LoginForm() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <Logo size="large" />
        <h2 className={styles.title}>Welcome Back</h2>

        <form className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
          />
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>

        <div className={styles.separator}></div>
        <p className={styles.footer}>Powered by Carlos Maccarrone</p>
      </div>
    </div>
  );
}