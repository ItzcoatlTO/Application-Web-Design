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

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA PÚBLICA */}
        <Route path="/" element={<HomePage />} />

        {/* RUTAS PRIVADAS */}
        {user && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/new" element={<OrderForm />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/orders/archived" element={<ArchivedOrders />} />

            {/* SOLO ADMIN: usuarios */}
            {user.role === 'admin' && (
              <>
                <Route path="/users" element={<UsersList />} />
                <Route path="/users/new" element={<UserForm />} />
              </>
            )}

            {/* SOLO RUTA: entregas */}
            {user.role === 'route' && (
              <Route path="/delivery" element={<DeliveryManager />} />
            )}

            {/* VISIBLE PARA TODOS LOGUEADOS */}
            <Route path="/customers" element={<CustomerSummary />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
