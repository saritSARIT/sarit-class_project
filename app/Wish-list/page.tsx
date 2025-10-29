import ProductList from "@/components/List";
import { getProductsByCategory, getProducts } from "@/utils/api";

interface Props {
  searchParams?: { category?: string };
}

export default async function CategoryPage({ searchParams }: Props) {
  const category = searchParams?.category;

  const products = category
    ? await getProductsByCategory(category)
    : await getProducts();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {category ? `Category: ${category}` : "All Products"}
      </h1>

      {products?.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p>No products found.</p>
      )}
    </main>
  );
}
