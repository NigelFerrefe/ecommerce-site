//This component will be client side rendered, so we can use the useState hook to manage the cart state. We map the cartIds to the products and then render them. We also use the Link component from Next.js to link to the product page. The product data is imported from a file, but in a real application, this should be managed in the backend because the products are not static.
"use client";

import { useState } from "react";
//We need to import the Product interface to use it in the component, because we are using the products array,
// if we don't import it, we will get an error
import { Product } from "../product-data";
import Link from "next/link";
import axios from "axios";

export default function ShoppingCartList({
  initialCartProducts,
}: {
  initialCartProducts: Product[];
}) {


  const [cartProducts, setCartProducts] = useState(initialCartProducts);


  const removeFromCart = async (productId: string) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/users/1/cart`, {
        data: { productId },
      });
      setCartProducts(res.data);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  return (
    <>
      <h1>Shopping Cart</h1>
      <div>
        {cartProducts.map((product) => (
          <div key={product.id} className="flex justify-between p-4 border-b border-2">
            <Link href={"/products/" + product.id}>
              <h3>{product.name}</h3>
              <p>{product.price}€</p>
            </Link>
            <div className="flex justify-end">
            <button
              className="px-4 py-2 mt-2 bg-red-500 text-white rounded"
              onClick={() => removeFromCart(product.id)}
              >
              Remove from Cart
            </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
