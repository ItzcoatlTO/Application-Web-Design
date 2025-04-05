import { Routes, Route } from 'react-router-dom';
import LayoutAdminLTE from './layout/LayoutAdminLTE';
import Inicio from './pages/Inicio';
import Fotos from './pages/Fotos';
import Contacto from './pages/Contacto';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutAdminLTE />}>
        <Route index element={<Inicio />} />
        <Route path="fotos" element={<Fotos />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>
    </Routes>
  );
};
export default App;
