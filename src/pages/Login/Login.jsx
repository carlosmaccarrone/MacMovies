import LoginSidebar from './LoginSidebar';
import styles from './Login.module.css';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.sidebarWrapper}>
        <LoginSidebar />
      </div>
      <div className={styles.loginFormWrapper}>
        <LoginForm />
      </div>
    </div>
  );
}