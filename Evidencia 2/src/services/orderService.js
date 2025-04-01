export function getOrders() {
    return (JSON.parse(localStorage.getItem('orders')) || []).filter(o => !o.isDeleted);
  }
  
  export function getArchivedOrders() {
    return (JSON.parse(localStorage.getItem('orders')) || []).filter(o => o.isDeleted);
  }
  
  export function saveOrder(order) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  }
  
  export function updateOrder(id, updates) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const updated = orders.map(o => o.id === id ? { ...o, ...updates } : o);
    localStorage.setItem('orders', JSON.stringify(updated));
  }
  
  export function deleteOrder(id) {
    updateOrder(id, { isDeleted: true });
  }
  
  export function restoreOrder(id) {
    updateOrder(id, { isDeleted: false });
  }
  