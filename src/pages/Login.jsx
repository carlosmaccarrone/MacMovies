import UserList from '../components/UserList';
import styles from './Login.module.css';

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.userlistWrapper}>
        <UserList />
      </div>
      <div className={styles.loginFormWrapper}>
        {/* Here we will then put the Login form */}
        <h2>Login Form Goes Here</h2>
      </div>
    </div>
  );
}