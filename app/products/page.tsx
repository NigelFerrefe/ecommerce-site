import ProductsList from "../ProductsList";
import { products } from "../product-data"; //This will be the props

export default function ProductsPage() {
  return (
    <>
      <h1>Products</h1>
      <ProductsList products={products} />
    </>
  );
}
