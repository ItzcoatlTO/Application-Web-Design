export function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
  }
  
  export function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  export function toggleUserStatus(id) {
    const users = getUsers();
    const updated = users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u);
    localStorage.setItem('users', JSON.stringify(updated));
  }
  