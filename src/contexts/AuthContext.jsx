import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// provider that wraps the entire app
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  // minimal persistence with sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLogged(true);
    }
  }, []);

  // login function
  const login = (username) => {
    setUser({ username });
    setIsLogged(true);
    sessionStorage.setItem('user', JSON.stringify({ username }));
  };

  // logout function
  const logout = () => {
    setUser(null);
    setIsLogged(false);
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};