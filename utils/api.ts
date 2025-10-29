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
 const res = await fetch(`${BASE_URL}/products/category/${category}`, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to load products for ${category}`);
  return res.json();
}
