export function uploadDeliveryPhoto(orderId, routeUserId, photo, status) {
    const deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
  
    const newDelivery = {
      id: Date.now(),
      orderId,
      routeUserId,
      deliveryDate: new Date().toISOString().split('T')[0],
      status,
      photo
    };
  
    deliveries.push(newDelivery);
    localStorage.setItem('deliveries', JSON.stringify(deliveries));
  }
  