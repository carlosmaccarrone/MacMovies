import React, { useEffect, useState } from 'react';

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
    <div style={{padding: '1rem', borderRight: '1px solid #ccc', height: '100vh', overflowY: 'auto', width: '250px'}}>
      <h3>Demo users</h3>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th style={{textAlign: 'left'}}>Username</th>
            <th style={{textAlign: 'left'}}>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({username, password}) => (
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
