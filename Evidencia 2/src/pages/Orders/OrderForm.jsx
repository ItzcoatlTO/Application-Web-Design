import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
  const [form, setForm] = useState({
    invoiceNumber: '',
    customerId: 1,
    orderDate: new Date().toISOString(),
    notes: '',
    status: 'Ordered',
    isDeleted: false
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = { id: Date.now(), ...form };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    navigate('/orders');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nueva Orden</h3>
      <input required placeholder="Número de Factura" onChange={e => setForm({ ...form, invoiceNumber: e.target.value })} />
      <textarea placeholder="Notas" onChange={e => setForm({ ...form, notes: e.target.value })}></textarea>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default OrderForm;
