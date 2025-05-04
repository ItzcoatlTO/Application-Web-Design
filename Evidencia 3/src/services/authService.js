export function login(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(u => u.username === username && u.password === password && u.isActive);
  }
  
  export function logout() {
    localStorage.removeItem('loggedUser');
  }
  