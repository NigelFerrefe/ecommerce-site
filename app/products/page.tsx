import ProductsList from "../ProductsList";
import { products } from "../product-data"; //This will be the props

export default function ProductsPage() {
  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <h1 className="text-center text-4xl">Products</h1>
      <ProductsList products={products} />
    </div>
  );
}
