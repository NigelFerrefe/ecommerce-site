import ProductsList from "../ProductsList";
import axios from "axios";

export default async function ProductsPage() {
  const res = await axios.get("http://localhost:3000/api/products");
  const products = res.data;
  
  //We gonna pass this as a prop to the component
  const response = await axios.get('http://localhost:3000/api/users/1/cart')
  const cartProducts = response.data


  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <h1 className="text-center text-4xl">Products</h1>
      <ProductsList products={products} initialCartProducts={cartProducts} />
    </div>
  );
}
