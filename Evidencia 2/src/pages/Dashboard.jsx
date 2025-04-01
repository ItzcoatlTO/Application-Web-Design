import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Segoe UI, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2>👋 Bienvenido, {user.username}</h2>
      <p><strong>Rol:</strong> {user.role}</p>
      <button onClick={logout} style={{
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '10px'
      }}>Cerrar sesión</button>

      <hr style={{ margin: '30px 0' }} />

      <h3>🔗 Accesos rápidos</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li><Link to="/orders">📦 Gestión de Órdenes</Link></li>
        <li><Link to="/orders/new">➕ Nueva Orden</Link></li>
        <li><Link to="/orders/archived">🗂️ Órdenes Archivadas</Link></li>
        <li><Link to="/customers">📋 Clientes y Facturas</Link></li>

        {user.role === 'admin' && (
          <>
            <li><Link to="/users">👥 Lista de Usuarios</Link></li>
            <li><Link to="/users/new">➕ Crear Usuario</Link></li>
          </>
        )}

        {user.role === 'route' && (
          <li><Link to="/delivery">🚚 Subir Entregas</Link></li>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
