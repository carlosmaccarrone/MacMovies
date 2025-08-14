import LoginSidebar from '@/pages/Login/LoginSidebar';
import styles from '@/pages/Login/Login.module.css';
import LoginForm from '@/pages/Login/LoginForm';

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