import { useEffect, useState } from 'react';

const CustomerSummary = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setCustomers(storedCustomers);
    setOrders(storedOrders);
  }, []);

  const getCustomerOrders = (customerId) => {
    return orders.filter(order => order.customerId === customerId);
  };

  return (
    <div style={{
      padding: '40px',
      maxWidth: '1000px',
      margin: '0 auto',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h2 style={{ marginBottom: '20px' }}>📊 Resumen de Clientes y Facturas</h2>

      {customers.length === 0 && <p>⚠️ No hay clientes registrados aún.</p>}

      {customers.map(customer => (
        <div key={customer.id} style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3>👤 {customer.name} ({customer.customerNumber})</h3>
          <p><strong>Dirección:</strong> {customer.deliveryAddress}</p>
          <p><strong>RFC:</strong> {customer.fiscalData}</p>

          <h4 style={{ marginTop: '15px' }}>📦 Facturas:</h4>
          {getCustomerOrders(customer.id).length === 0 ? (
            <p style={{ color: '#777' }}>No hay facturas para este cliente.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <th style={thStyle}># Factura</th>
                  <th style={thStyle}>Fecha</th>
                  <th style={thStyle}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {getCustomerOrders(customer.id).map(order => (
                  <tr key={order.id}>
                    <td style={tdStyle}>{order.invoiceNumber}</td>
                    <td style={tdStyle}>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td style={{
                      ...tdStyle,
                      color: order.status === 'Delivered' ? 'green' : 'orange',
                      fontWeight: 'bold'
                    }}>
                      {order.status === 'Delivered' ? 'Entregada' : 'Pendiente'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

const thStyle = {
  padding: '10px',
  borderBottom: '1px solid #ccc',
  textAlign: 'left'
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #eee'
};

export default CustomerSummary;
