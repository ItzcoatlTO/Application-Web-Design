import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Dashboard from '../pages/Dashboard';
import OrderList from '../pages/Orders/OrderList';
import OrderForm from '../pages/Orders/OrderForm';
import OrderDetails from '../pages/Orders/OrderDetails';
import ArchivedOrders from '../pages/Orders/ArchivedOrders';
import UsersList from '../pages/Users/UsersList';
import UserForm from '../pages/Users/UserForm';
import DeliveryManager from '../pages/Orders/DeliveryManager';
import CustomerSummary from '../pages/Customers/CustomerSummary';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../context/ProtectedRoute';  // Importamos el ProtectedRoute

const AppRouter = () => {
  const { user } = useAuth();  // Obtener el usuario logueado desde el contexto

  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA PÚBLICA */}
        <Route path="/" element={<HomePage />} />

        {/* RUTAS PRIVADAS */}
        {user && (
          <>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
            <Route path="/orders/new" element={<ProtectedRoute><OrderForm /></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
            <Route path="/orders/archived" element={<ProtectedRoute><ArchivedOrders /></ProtectedRoute>} />

            {/* SOLO ADMIN: usuarios */}
            {user.role === 'admin' && (
              <>
                <Route path="/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
                <Route path="/users/new" element={<ProtectedRoute><UserForm /></ProtectedRoute>} />
              </>
            )}

            {/* SOLO RUTA: entregas */}
            {user.role === 'route' && (
              <Route path="/delivery" element={<ProtectedRoute><DeliveryManager /></ProtectedRoute>} />
            )}

            {/* VISIBLE PARA TODOS LOGUEADOS */}
            <Route path="/customers" element={<ProtectedRoute><CustomerSummary /></ProtectedRoute>} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
