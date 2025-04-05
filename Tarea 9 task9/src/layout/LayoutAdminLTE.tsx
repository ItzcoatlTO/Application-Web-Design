import { NavLink, Outlet } from 'react-router-dom';

const LayoutAdminLTE: React.FC = () => {
  return (
    <div className="wrapper">
      {/* Main Sidebar */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="/" className="brand-link">
          <span className="brand-text font-weight-light">Menús App</span>
        </a>

        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <NavLink to="/" end className="nav-link">
                  <i className="nav-icon fas fa-house"></i>
                  <p>Inicio</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/fotos" className="nav-link">
                  <i className="nav-icon fas fa-image"></i>
                  <p>Fotos</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contacto" className="nav-link">
                  <i className="nav-icon fas fa-envelope"></i>
                  <p>Contacto</p>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Content Wrapper */}
      <div className="content-wrapper" style={{ minHeight: '100vh' }}>
        <section className="content pt-4 px-3">
          <Outlet />
        </section>

        <footer className="main-footer text-center">
          <strong>Hecho por Itzcoatl - 2025</strong>
        </footer>
      </div>
    </div>
  );
};

export default LayoutAdminLTE;
