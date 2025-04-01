import { useEffect, useState } from 'react';

const DeliveryManager = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('orders')) || [];
    const inRoute = all.filter(o => o.status === 'InRoute' && !o.isDeleted);
    setOrders(inRoute);
  }, []);

  const handleFileUpload = (e, orderId) => {
    const file = e.target.files[0];
    if (!file) return alert('❌ No se seleccionó ningún archivo');

    const reader = new FileReader();
    reader.onloadend = () => {
      const photoData = reader.result;

      const deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
      deliveries.push({
        id: Date.now(),
        orderId,
        routeUserId: 4, // Simulado
        deliveryDate: new Date().toISOString().split('T')[0],
        status: 'delivered',
        photo: photoData
      });
      localStorage.setItem('deliveries', JSON.stringify(deliveries));

      // Cambiar estado de la orden a Delivered
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      const updated = orders.map(o =>
        o.id === orderId ? { ...o, status: 'Delivered' } : o
      );
      localStorage.setItem('orders', JSON.stringify(updated));
      setOrders(updated.filter(o => o.status === 'InRoute'));
      alert('✅ Evidencia cargada y estado actualizado.');
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h2>📦 Entregas en Ruta</h2>
      {orders.length === 0 && <p>No hay órdenes en estado "InRoute".</p>}
      {orders.map(order => (
        <div key={order.id} style={{
          backgroundColor: '#fff',
          marginBottom: '20px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <p><strong>Factura:</strong> {order.invoiceNumber}</p>
          <p><strong>Cliente ID:</strong> {order.customerId}</p>
          <p><strong>Fecha:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          <p><strong>Estado:</strong> {order.status}</p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, order.id)}
            style={{ marginTop: '10px' }}
          />
        </div>
      ))}
    </div>
  );
};

export default DeliveryManager;
