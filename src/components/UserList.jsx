import { useEffect, useState } from 'react';
import styles from './UserList.module.css';

function UserList() {
  const [users, setUsers] = useState([]);

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
    <div className={styles.userlistContainer}>
      <h3>Demo users</h3>
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
  );
}

export default UserList;
