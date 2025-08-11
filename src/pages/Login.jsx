import React from 'react';
import UserList from '../components/UserList';

export default function Login() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
        <UserList />
      </div>
      <div style={{ flex: 2, padding: '20px' }}>
        {/* Aquí luego pondremos el formulario Login */}
        <h2>Login Form Goes Here</h2>
      </div>
    </div>
  );
}