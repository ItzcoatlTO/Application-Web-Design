import { useEffect, useState } from 'react';

const HomePage = () => {
  const [customerNumber, setCustomerNumber] = useState('C12345');
  const [invoice, setInvoice] = useState('INV1001');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  const [newCustomer, setNewCustomer] = useState({ customerNumber: '', name: '', address: '', fiscalData: '' });
  const [newInvoice, setNewInvoice] = useState({ invoiceNumber: '', customerNumber: '' });

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem('customers')) || [];
    const o = JSON.parse(localStorage.getItem('orders')) || [];
    const d = JSON.parse(localStorage.getItem('deliveries')) || [];
    setCustomers(c);
    setOrders(o);
    setDeliveries(d);
  }, []);

  const reset = () => {
    setResult(null);
    setError('');
  };

  const handleSearch = () => {
    const customer = customers.find(c => c.customerNumber === customerNumber);
    if (!customer) return setError('❌ Cliente no encontrado');

    const order = orders.find(o => o.customerId === customer.id && o.invoiceNumber === invoice);
    if (!order) return setError('❌ Orden no encontrada');

    const delivery = deliveries.find(d => d.orderId === order.id);
    setResult({ order, delivery });
  };

  const handleAddCustomer = () => {
    const exists = customers.find(c => c.customerNumber === newCustomer.customerNumber);
    if (exists) return alert('⚠️ Cliente ya existe');
    const id = Date.now();
    const updated = [...customers, { id, ...newCustomer }];
    localStorage.setItem('customers', JSON.stringify(updated));
    setCustomers(updated);
    setNewCustomer({ customerNumber: '', name: '', address: '', fiscalData: '' });
  };

  const handleAddInvoice = () => {
    const customer = customers.find(c => c.customerNumber === newInvoice.customerNumber);
    if (!customer) return alert('❌ Cliente no existe');
    const id = Date.now();
    const newOrder = {
      id,
      invoiceNumber: newInvoice.invoiceNumber,
      customerId: customer.id,
      orderDate: new Date().toISOString(),
      notes: '',
      status: 'Ordered',
      isDeleted: false
    };
    const updated = [...orders, newOrder];
    localStorage.setItem('orders', JSON.stringify(updated));
    setOrders(updated);
    setNewInvoice({ invoiceNumber: '', customerNumber: '' });
  };

  const getCustomerOrders = (customerId) => {
    return orders.filter(o => o.customerId === customerId);
  };

  const getDeliveryDate = (orderId) => {
    const d = deliveries.find(del => del.orderId === orderId);
    return d ? d.deliveryDate : '—';
  };

  const updateDeliveryField = (field, value) => {
    const deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
    const index = deliveries.findIndex(d => d.orderId === result.order.id);
    if (index === -1) {
      alert('⚠️ La entrega no existe, se creará nueva.');
      const newDelivery = {
        id: Date.now(),
        orderId: result.order.id,
        routeUserId: 4,
        deliveryDate: value,
        status: 'delivered',
        photo: ''
      };
      const updated = [...deliveries, newDelivery];
      localStorage.setItem('deliveries', JSON.stringify(updated));
      setDeliveries(updated);
      setResult({ ...result, delivery: newDelivery });
      return;
    }
    deliveries[index][field] = value;
    localStorage.setItem('deliveries', JSON.stringify(deliveries));
    const updated = { ...result, delivery: deliveries[index] };
    setDeliveries(deliveries);
    setResult(updated);
    alert('✅ Actualizado');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateDeliveryField('photo', reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ background: '#f5f6fa', padding: '30px', fontFamily: 'Segoe UI' }}>
      <div style={{
        background: '#fff', maxWidth: '900px', margin: '0 auto',
        padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🔍 Consulta tu orden</h2>

        {!result && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input value={customerNumber} onChange={e => setCustomerNumber(e.target.value)}
              placeholder="Número de Cliente"
              style={{ flex: 1, padding: '10px' }} />
            <input value={invoice} onChange={e => setInvoice(e.target.value)}
              placeholder="Número de Factura"
              style={{ flex: 1, padding: '10px' }} />
            <button onClick={handleSearch}
              style={{ padding: '10px 15px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '5px' }}>
              Buscar
            </button>
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {result && (
          <div style={{ marginBottom: '20px' }}>
            <p><strong>Estado:</strong> {result.order.status}</p>
            <p><strong>Fecha:</strong> {new Date(result.order.orderDate).toLocaleDateString()}</p>

            <div style={{ marginTop: '15px' }}>
              <h4>📸 Evidencia:</h4>
              {result.delivery?.photo && (
                <img
                  src={result.delivery.photo}
                  alt="Evidencia"
                  style={{
                    maxWidth: '400px',
                    width: '100%',
                    marginBottom: '10px',
                    borderRadius: '8px'
                  }}
                />
              )}

              <label>📅 Fecha de entrega:</label><br />
              <input
                type="date"
                defaultValue={result.delivery?.deliveryDate || new Date().toISOString().split("T")[0]}
                onChange={(e) => updateDeliveryField('deliveryDate', e.target.value)}
                style={{ padding: '5px', marginBottom: '10px' }}
              />
              <br />
              <label>📁 Subir nueva imagen:</label><br />
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            <button onClick={reset} style={{
              marginTop: '20px', background: '#aaa', color: '#fff', border: 'none', padding: '10px',
              borderRadius: '5px'
            }}>🔁 Buscar otra orden</button>
          </div>
        )}

        <hr style={{ margin: '30px 0' }} />

        <h3>➕ Agregar Cliente</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <input placeholder="Número Cliente" value={newCustomer.customerNumber}
            onChange={e => setNewCustomer({ ...newCustomer, customerNumber: e.target.value })} />
          <input placeholder="Nombre / Empresa" value={newCustomer.name}
            onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })} />
          <input placeholder="Dirección" value={newCustomer.address}
            onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })} />
          <input placeholder="Datos Fiscales" value={newCustomer.fiscalData}
            onChange={e => setNewCustomer({ ...newCustomer, fiscalData: e.target.value })} />
          <button onClick={handleAddCustomer}
            style={{ background: '#27ae60', color: '#fff', padding: '8px 15px', border: 'none', borderRadius: '5px' }}>
            Guardar Cliente
          </button>
        </div>

        <h3>➕ Agregar Factura</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <input placeholder="Factura" value={newInvoice.invoiceNumber}
            onChange={e => setNewInvoice({ ...newInvoice, invoiceNumber: e.target.value })} />
          <input placeholder="Cliente" value={newInvoice.customerNumber}
            onChange={e => setNewInvoice({ ...newInvoice, customerNumber: e.target.value })} />
          <button onClick={handleAddInvoice}
            style={{ background: '#f39c12', color: '#fff', padding: '8px 15px', border: 'none', borderRadius: '5px' }}>
            Guardar Factura
          </button>
        </div>

        <h3>📋 Clientes y Facturas</h3>
        {customers.length === 0 ? (
          <p>No hay clientes registrados.</p>
        ) : (
          customers.map(c => (
            <div key={c.id} style={{ marginBottom: '20px', background: '#fdfdfd', padding: '15px', borderRadius: '8px' }}>
              <strong>{c.name} ({c.customerNumber})</strong>
              <p style={{ fontSize: '14px', color: '#666' }}>{c.address} | {c.fiscalData}</p>
              <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                {getCustomerOrders(c.id).map(order => (
                  <li key={order.id}>
                    🧾 {order.invoiceNumber} – 
                    <strong style={{ color: order.status === 'Delivered' ? 'green' : '#e67e22' }}>
                      {order.status}
                    </strong> ({new Date(order.orderDate).toLocaleDateString()}) 
                    {order.status === 'Delivered' && (
                      <span style={{ fontSize: '13px', marginLeft: '5px', color: '#888' }}>
                        🗓️ Entregado: {getDeliveryDate(order.id)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
