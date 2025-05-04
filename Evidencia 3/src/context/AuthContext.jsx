import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('loggedUser')) || null);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const found = users.find(u => u.username === username && u.password === password && u.isActive);
    if (found) {
      setUser(found);
      localStorage.setItem('loggedUser', JSON.stringify(found));
    }
    return found;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
