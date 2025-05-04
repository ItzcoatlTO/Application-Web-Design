import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OrderDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const found = orders.find(o => o.id === Number(id));
    setOrder(found);
  }, [id]);

  const updateStatus = (newStatus) => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const updated = orders.map(o => o.id === order.id ? { ...o, status: newStatus } : o);
    localStorage.setItem('orders', JSON.stringify(updated));
    setOrder({ ...order, status: newStatus });
  };

  const handlePhotoUpload = (e, status) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
      deliveries.push({
        id: Date.now(),
        orderId: order.id,
        routeUserId: user.id,
        deliveryDate: new Date().toISOString().split('T')[0],
        status,
        photo: reader.result
      });
      localStorage.setItem('deliveries', JSON.stringify(deliveries));
    };
    if (file) reader.readAsDataURL(file);
  };

  if (!order) return <p>Cargando...</p>;

  return (
    <div>
      <h3>Orden #{order.invoiceNumber}</h3>
      <p>Estado: {order.status}</p>
      <p>Notas: {order.notes}</p>

      {['Ordered', 'InProcess'].includes(order.status) && (
        <button onClick={() => updateStatus('InRoute')}>Marcar como En Ruta</button>
      )}

      {order.status === 'InRoute' && user.role === 'route' && (
        <>
          <p>Foto antes de la entrega:</p>
          <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'before_delivery')} />
          <button onClick={() => updateStatus('Delivered')}>Marcar como Entregado</button>
        </>
      )}

      {order.status === 'Delivered' && user.role === 'route' && (
        <>
          <p>Foto de entrega:</p>
          <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'delivered')} />
        </>
      )}
    </div>
  );
};

export default OrderDetails;
