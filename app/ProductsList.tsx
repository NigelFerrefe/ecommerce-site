import Image from "next/image"; // component for optimize image with lazy loading
import Link from "next/link"; // another component, we don't use <a> because it reload page

import { Product } from "./product-data";

export default function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="flex flex-wrap justify-center p-5 gap-10 items-center">
      {products.map((product) => (
        <Link key={product.id} href={"/products/" + product.id} className=" w-64 mx-auto text-center rounded-lg shadow-md">
          <Image
            src={'/' + product.imageUrl}
            alt={product.name}
            width={150}
            height={150}
            className="mx-auto"
          />
          <div className="hover:bg-customOrange hover:text-white px-4 py-2">
          <h2 className="text-2xl tracking-wide">{product.name}</h2>
          <p className="font-light">{product.price}€</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
