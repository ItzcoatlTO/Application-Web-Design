import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(all.filter(o => !o.isDeleted));
  }, []);

  const handleDelete = (id) => {
    const updated = orders.map(o => o.id === id ? { ...o, isDeleted: true } : o);
    localStorage.setItem('orders', JSON.stringify(updated));
    setOrders(updated.filter(o => !o.isDeleted));
  };

  const filtered = orders.filter(o =>
    o.invoiceNumber.includes(query) ||
    o.status.includes(query) ||
    new Date(o.orderDate).toLocaleDateString().includes(query)
  );

  return (
    <div>
      <h3>Órdenes</h3>
      <Link to="/orders/new">+ Nueva Orden</Link>
      <input placeholder="Buscar por factura/fecha/estado" value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {filtered.map(o => (
          <li key={o.id}>
            #{o.invoiceNumber} | {o.status} | {o.orderDate}
            <Link to={`/orders/${o.id}`}> Ver </Link>
            <button onClick={() => handleDelete(o.id)}> Archivar </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
