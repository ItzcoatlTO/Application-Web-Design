export function seedApp() {
    const alreadySeeded = localStorage.getItem('seeded');
    if (alreadySeeded) return;
  
    const users = [
      { id: 1, username: 'admin', password: 'admin123', role: 'admin', isActive: true },
      { id: 2, username: 'sales1', password: '1234', role: 'sales', isActive: true },
      { id: 3, username: 'warehouse1', password: '1234', role: 'warehouse', isActive: true },
      { id: 4, username: 'route1', password: '1234', role: 'route', isActive: true }
    ];
  
    const customers = [
      {
        id: 1,
        name: 'Cliente Demo',
        customerNumber: 'C12345',
        fiscalData: 'RFC1234567',
        deliveryAddress: 'Av. Siempre Viva 742'
      }
    ];
  
    const orders = [
      {
        id: 1,
        invoiceNumber: 'INV1001',
        customerId: 1,
        orderDate: new Date().toISOString(),
        notes: 'Prueba automatizada',
        status: 'Delivered',
        isDeleted: false
      }
    ];
  
    const deliveries = [
      {
        id: 1,
        orderId: 1,
        routeUserId: 4,
        deliveryDate: new Date().toISOString().split('T')[0],
        status: 'delivered',
        photo: 'https://via.placeholder.com/300x200.png?text=Entrega+Confirmada'
      }
    ];
  
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('customers', JSON.stringify(customers));
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('deliveries', JSON.stringify(deliveries));
    localStorage.setItem('seeded', 'true');
  }
  