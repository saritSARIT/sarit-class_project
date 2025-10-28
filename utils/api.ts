const BASE_URL = "https://fakestoreapi.com";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}

export async function getProductById(id: number) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  return res.json();
}

export async function getProductsByCategory(category: string) {
  const encoded = encodeURIComponent(category);
  const res = await fetch(`${BASE_URL}/products/category/${encoded}`);
  return res.json();
}