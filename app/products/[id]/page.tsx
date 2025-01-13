/*To be dynamic, instead the useParams with vite, we put inside the parent folder, and we rename 
the folder to the params that u want,in this case, ID */
'use client';
import NotFoundPage from "@/app/not-found";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/products/${params.id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    // Fetch cart products
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/1/cart");
        setCartProducts(res.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }

    fetchProduct();
    fetchCart();
  }, [params.id]);

  const addToCart = async (productId: string) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/users/1/cart`, {
        productId,
      });
      setCartProducts(res.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

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
  const productInCart = (productId: string) => {
    return cartProducts.some((cp) => cp.id === productId);
  };

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="container mx-auto p-8 flex flex-col md:flex-row">
      <div className="md:w-1/2 mb-4 md:mb-0 md:mr-8">
        <img
          src={"/" + product.imageUrl}
          alt={`image of ${product.name}`}
          className="w-full h-auto rounded-lg shadow-md"
          loading="lazy"
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
        <p className="text-2xl text-gray-600 mb-6">{product.price}€</p>
        <h3 className="text-2xl font-semibold mb-2">Descripción:</h3>
        <p className="text-gray-700">{product.description}</p>
        {productInCart(product.id) ? (
          <button
            className="px-4 py-2 mt-4 bg-red-500 text-white rounded"
            onClick={() => removeFromCart(product.id)}
          >
            Remove from Cart
          </button>
        ) : (
          <button
            className="px-4 py-2 mt-4 bg-green-500 text-white rounded"
            onClick={() => addToCart(product.id)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

//The loading lazy in the image is to load the image when the user is seeing it, not before
//Thats good for the performance of the page, because the image is not loaded until the user is seeing it
//The image is loaded when the user is scrolling down to see the image
