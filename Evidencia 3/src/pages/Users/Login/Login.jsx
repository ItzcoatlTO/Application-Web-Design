import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';  // Accedemos al contexto de autenticación
import { toast } from 'react-toastify';

const Login = () => {
  const { login } = useAuth();  // Función de login desde el contexto
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Intentamos hacer login
    const user = login(username, password);

    if (user) {
      toast.success('¡Bienvenido!', { position: 'top-right' });
      navigate('/dashboard');  // Redirige al Dashboard si el login es exitoso
    } else {
      toast.error('❌ Usuario o contraseña incorrectos', { position: 'top-right' });
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su usuario"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
