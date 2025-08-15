import styles from '@/pages/Login/LoginSidebar.module.css';
import { useEffect, useState } from 'react';

function LoginSidebar() {
  const [users, setUsers] = useState([]);

  const footerText = `
  Welcome to the podium of top movie ratings and reviews.  
  Discover carefully curated movie data from TMDb, all in one spot.  
  Use the demo users above to log in quickly and explore features.  
  MacMovies is designed to deliver a seamless, intuitive, and  
  truly enjoyable experience for every passionate movie fan.  
  Created and maintained by Carlos Maccarrone, a dedicated  
  developer focused on quality, innovation, and clean design.  
  We’re constantly adding new features and movies to discover.  
  Share your feedback and suggestions to help us improve and grow.  
  Thank you for being part of the MacMovies community — enjoy the show!
  `;

  useEffect(() => {
    fetch('./users.json')
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
