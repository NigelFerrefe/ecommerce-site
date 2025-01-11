import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-customOrange">
      <div className=" container flex flex-row justify-around items-center px-4 py-10">
        <Link className="text-2xl hover:text-white" href="/">
          Home
        </Link>
        <Link className="text-2xl hover:text-white" href="/products">
          Products
        </Link>
        <Link className="text-2xl hover:text-white" href="/cart">
          Cart
        </Link>
        <Link className="text-2xl hover:text-white" href="/checkout">
          Checkout
        </Link>
      </div>
    </nav>
  );
}
