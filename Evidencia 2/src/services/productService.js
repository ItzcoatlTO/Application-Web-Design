export function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
  }
  