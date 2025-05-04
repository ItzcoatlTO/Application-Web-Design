import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'sales' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { id: Date.now(), ...form, isActive: true };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/users');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crear Usuario</h3>
      <input required placeholder="Usuario" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input required placeholder="Contraseña" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="sales">Ventas</option>
        <option value="warehouse">Almacén</option>
        <option value="purchasing">Compras</option>
        <option value="route">Reparto</option>
        <option value="admin">Administrador</option>
      </select>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default UserForm;
