'use client';

import { useState } from "react";
import { products } from "../product-data"; // Btw, this should be managed in the backend because the products are not static
import Link from "next/link";


export default function CartPage() {
  const [cartIds] = useState(["123", "345"]);
  const cartProducts = cartIds.map((id) => products.find((p) => p.id === id)!); // First we map the ids, then we find the product with the id

  return (
    <>
      <h1>Shopping Cart</h1>
      {cartProducts.map(product => (
        <Link key={product.id} href={'/products/' + product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}€</p>
        </Link>
      ))}
    </>
  );
}
