import { useState } from 'react';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);

  const toggleStatus = (id) => {
    const updated = users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u);
    localStorage.setItem('users', JSON.stringify(updated));
    setUsers(updated);
  };

  return (
    <div>
      <h3>Usuarios</h3>
      <Link to="/users/new">+ Crear Usuario</Link>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.username} - {u.role} - {u.isActive ? 'Activo' : 'Inactivo'}
            <button onClick={() => toggleStatus(u.id)}>Cambiar estado</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
