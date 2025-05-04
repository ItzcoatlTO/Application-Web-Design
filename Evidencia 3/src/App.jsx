import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Importar los estilos de Toastify
import AppRouter from './router/AppRouter';  // Importar las rutas

const App = () => {
  return (
    <div>
      <AppRouter />  {/* Aquí van todas las rutas */}
      <ToastContainer />  {/* Aquí se renderizan las notificaciones */}
    </div>
  );
};

export default App;
