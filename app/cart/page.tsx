"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import ShoppingCartList from "./ShoppingCartList";
import NotFoundPage from "../not-found";

export default function CartPage() {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  
  //We hardcode the user id to 1, because we are not implementing the authentication
  //In a real application, we should get the user id from the authentication token
  //We should use JWT to authenticate the user with npm install jsonwebtoken
  //Also nmp install ironlauncher
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/1/cart");
        setCartProducts(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <NotFoundPage />;
  }

  return <ShoppingCartList initialCartProducts={cartProducts} />;
}
