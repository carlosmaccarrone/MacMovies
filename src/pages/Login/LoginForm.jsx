import styles from '@/pages/Login/LoginForm.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { useState } from 'react';

const simpleHash = (str) => btoa(str);

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

  try {
    const userFound = await fetchUser(username);

    if (!userFound || simpleHash(password) !== userFound.password) {
      setTimeout(() => { 
        setError('Incorrect username or password');
        setLoading(false);
      }, 400);
    } else {
      setTimeout(() => { 
        setLoading(false);
        login(userFound.username); 
        navigate('/home');
      }, 400);
    }
  } catch (err) {
    setError('Error connecting to the server');
    setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <Logo width="260px" />
        <h2 className={styles.title}>Welcome Back</h2>

        <form className={styles.form} onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}            
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}            
          />
          <button type="submit" className={styles.loginButton} disabled={loading}>
            {loading ? 'Validating...' : 'Login'}
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <div className={styles.separator}></div>
        <p className={styles.footer}>Powered by Carlos Maccarrone</p>
      </div>
    </div>
  );
};

export default LoginForm;

