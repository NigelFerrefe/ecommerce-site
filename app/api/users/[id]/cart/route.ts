import { connectToMongoDB } from "@/app/api/db";
import { NextRequest } from "next/server";
//The nextRequest has access to the request object and the response object
//The request body is the data sent by the client to the server

type Params = {
  id: string;
};

type ShoppingCart = Record<string, string[]>;
//This type shopping cart is a record that has a string key and a string array value
//I define here the type of the carts variable, to be an array of strings with string[]
//The first word is a key and the second word is the value

const carts: ShoppingCart = {
  "1": ["123", "234"],
  "2": ["345", "123"],
  "3": ["456"],
};
//I write carts: ShoppingCart to define the type of the carts variable
//I defined before the type of the carts variable, to be an array of strings with string[]

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { db } = await connectToMongoDB();
    const userId = params.id;
    const userCart = await db.collection("carts").findOne({ userId: userId });


    if (!userCart) {
      return new Response(
        JSON.stringify({
          message: "You have not selected any product",
          products: [],
        }),
        {
          status: 200,

          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    //We get the cartIds from the userCart object in teh database, wich is an array of product ids
    const cartIds = userCart.cartIds;
    
    //Here we fetch the products from the database that have the same id as the cartIds
    //after that we convert the products to an array
    const cartProducts = await db
      .collection("products")
      .find({ id: { $in: cartIds } })
      .toArray();

    return new Response(JSON.stringify(cartProducts), {
      status: 200,
      headers: {
        "Content-Type": "applications/json",
      },
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

//We need to define a body type for the request.json() method
//we could include a name, price, and description if the product is not in the database
type CartBody = {
  productId: string;
};

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const userId = params.id;
  const body: CartBody = await req.json();
  const productId = body.productId;
  const cartProducts = carts[userId].map((id) =>
    products.find((p) => p.id === id)
  );
  //This will populate the cartProducts array with the products that are in the cart

  carts[userId] = carts[userId] ? carts[userId].concat(productId) : [productId];
  //What the concat is doing here is adding the productId to the carts[userId] array
  //The concat method returns a new array with the added productId
  //We don't use push because we want to return a new array, not modify the existing one

  return new Response(JSON.stringify(cartProducts), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const userId = params.id;
  const body: CartBody = await req.json();
  const productId = body.productId;

  carts[userId] = carts[userId]
    ? carts[userId].filter((p) => p !== productId)
    : [];
  //We use the filter method to remove the product from the cart, the ternary operator is used to check if the cart is empty
  //If the cart is empty, we return an empty array
  const cartProducts = carts[userId].map((id) =>
    products.find((p) => p.id === id)
  );
  //This will populate the cartProducts array with the products that are in the cart

  return new Response(JSON.stringify(cartProducts), {
    status: 202,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
