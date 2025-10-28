import React from "react";
import ProductList from "@/components/List";
import { getProducts, getProductsByCategory } from "@/utils/api";

interface Props {
	searchParams?: { category?: string };
}

function detectCategoryField(products: any[], search: string | undefined) {
	if (!products || products.length === 0) return null;
	// prefer explicit `category` field if any product has it
	if (products.some(p => Object.prototype.hasOwnProperty.call(p, "category"))) return "category";

	// gather keys from first product (assuming consistent shape)
	const keys = Object.keys(products[0]);
	// 1) try to find a key where at least one product contains the search text
	if (search) {
		const s = search.toString().toLowerCase();
		for (const key of keys) {
			// only consider string fields
			if (typeof products[0][key] !== "string") continue;
			if (products.some((p: any) => typeof p[key] === "string" && p[key].toLowerCase().includes(s))) return key;
		}
	}

	// 2) fallback: find the first string field (likely a name/category-like field)
	for (const key of keys) {
		if (typeof products[0][key] === "string") return key;
	}

	return null;
}

export default async function CategoryPage({ searchParams }: Props) {
	// Next provides decoded searchParams, so use it directly to avoid double-decoding
	const category = searchParams?.category;

	let products: any[] = [];
	try {
		if (category) {
			// Try category-specific endpoint first
			const byCat = await getProductsByCategory(category);
			if (Array.isArray(byCat) && byCat.length > 0) {
				products = byCat;
			} else {
				// Fallback: fetch all products and try to detect which field contains the category info
				const all = await getProducts();
				const field = detectCategoryField(all, category);
				if (field) {
					const s = category ? category.toString().toLowerCase().trim() : "";
					// first try exact match (most APIs use exact category values)
					let matched = all.filter((p: any) => {
						const v = p[field];
						return typeof v === "string" && v.toLowerCase().trim() === s;
					});
					// if none found, fall back to contains match
					if (matched.length === 0) {
						matched = all.filter((p: any) => {
							const v = p[field];
							return typeof v === "string" && v.toLowerCase().includes(s);
						});
					}
					products = matched;
				} else {
					products = [];
				}
			}
		} else {
			products = await getProducts();
		}
	} catch (err) {
		console.error("Failed to fetch products for category page", err);
		products = [];
	}

	return (
		<main className="p-6">
			<h1 className="text-2xl font-bold mb-4">
				{category ? `Category: ${category}` : "All Products"}
			</h1>

			{products.length > 0 ? (
				<ProductList products={products} />
			) : (
				<p>No products found.</p>
			)}
		</main>
	);
}
