import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end className="nav-link">Inicio</NavLink>
      <NavLink to="/fotos" className="nav-link">Fotos</NavLink>
      <NavLink to="/contacto" className="nav-link">Contacto</NavLink>
    </nav>
  );
};

export default Navbar;
