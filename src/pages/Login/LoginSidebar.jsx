import styles from '@/pages/Login/LoginSidebar.module.css';
import { useEffect, useState } from 'react';

function LoginSidebar() {
  const [users, setUsers] = useState([]);

  const footerText = `
  Welcome to the podium of the best movie ratings and reviews.
  Here, you can explore carefully curated movie data, all in one place.
  Use the demo users listed above to log in quickly and test the features.
  MacMovies is thoughtfully designed to provide a seamless, intuitive, and 
  thoroughly enjoyable experience for every passionate movie lover.
  Created and carefully maintained by Carlos Maccarrone, a dedicated 
  developer committed to delivering quality and innovation.
  We’re constantly improving the app, adding new features and movies to discover.
  Feel free to share your feedback and suggestions to help us grow.
  Thank you for being part of the MacMovies community — enjoy the show!
  `;

  useEffect(() => {
    fetch('/users.json')
      .then((res) => res.json())
      .then((data) => {
        const decodedUsers = data.map(user => {
          const decodedPass = atob(user.password);
          return {
            username: user.username,
            password: decodedPass,
          };
        });
        setUsers(decodedUsers);
      })
      .catch(err => {
        console.error('Error loading users:', err);
      });
  }, []);

  return (
    <div className={styles.sidebarContainer}>
      <h3>Movie Lovers from MacMovies</h3>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ username, password }) => (
              <tr key={username}>
                <td>{username}</td>
                <td>{password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.footerNote}>
        {footerText}
      </p>
    </div>
  );
}

export default LoginSidebar;
