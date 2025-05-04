import { useEffect, useState } from 'react';

const ArchivedOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(all.filter(o => o.isDeleted));
  }, []);

  const restore = (id) => {
    const updated = orders.map(o => o.id === id ? { ...o, isDeleted: false } : o);
    localStorage.setItem('orders', JSON.stringify(updated));
    setOrders(updated.filter(o => o.isDeleted));
  };

  return (
    <div>
      <h3>Órdenes Archivadas</h3>
      <ul>
        {orders.map(o => (
          <li key={o.id}>
            #{o.invoiceNumber} - {o.status}
            <button onClick={() => restore(o.id)}>Restaurar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArchivedOrders;
