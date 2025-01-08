/*To be dynamic, instead the useParams with vite, we put inside the parent folder, and we rename 
the folder to the params that u want,in this case, ID */
import NotFoundPage from "@/app/not-found";
import { products } from "@/app/product-data"; //for nested routes we use @ instead of ./

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return <NotFoundPage />;
  } //Check if the product exists, if not, we return the NotFoundPage

  return (
    <div className="container mx-auto p-8 flex flex-col md:flex-row">
      <div className="md:w-1/2 mb-4 md:mb-0 md: mr-8">
        <img
          src={"/" + product.imageUrl}
          alt={`image of ${product.name}`}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
        <p className="text-2xl text-gray-600 mb-6">{product.price}€</p>
        <h3 className="text-2xl font-semibold mb-2">Descripción:</h3>
        <p className="text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}
