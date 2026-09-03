const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export async function getProducts(){const r=await fetch(`${API}/products`);if(!r.ok)throw Error('Products request failed');return r.json();}
export async function getProduct(slug){const r=await fetch(`${API}/products/${slug}`);if(!r.ok)throw Error('Product request failed');return r.json();}
