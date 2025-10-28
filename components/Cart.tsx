
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishListStore";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.category}>{product.category}</p>
      <p className={styles.price}>${product.price}</p>

      <div className={styles.buttons}>
        <button className={styles.cartButton} onClick={() => addToCart(product)}>
          Add to Cart
        </button>

        <button
          className={`${styles.wishlistButton} ${isInWishlist(product.id) ? styles.active : ""}}
          onClick={() => toggleWishlist(product)`}
        >
          ♥
        </button>
      </div>
    </div>
  );
}