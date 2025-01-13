import { connectToMongoDB } from "@/app/api/db";
import { NextRequest } from "next/server";
//The nextRequest has access to the request object and the response object
//The request body is the data sent by the client to the server

//The type Params is an object that contains the id of the user
//We need it to get the userCart from the database
//If we don't put it, we will get an error because we need to pass the id to the function
type Params = {
  id: string;
};

//We need to define a body type for the request.json() method
//we could include a name, price, and description if the product is not in the database

type CartBody = {
  productId: string;
};



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

export async function POST(req: NextRequest, { params }: { params: Params }) {
  try {
    const { db } = await connectToMongoDB();
    const userId = params.id;
    const body: CartBody = await req.json();
    const productId = body.productId;

    const updatedCart = await db.collection("carts").findOneAndUpdate(
      { userId },
      {
        $push: { cartIds: productId },
      },
      { upsert: true, returnDocument: "after" }
    );
    //UpdatedCart is an object that contains the updated cartIds array
    //The userId is the key and the productId is the value, we can say just userId because the key and the value are the same
    //The push operator is used to add the productId to the cartIds array
    //Finally, the upsert option is doing an insert if the document does not exist
    //The returnDocument option is used to return the updated document
    //So we can see the updated cartIds array

    const cartProducts = await db
      .collection("products")
      .find({ id: { $in: updatedCart.cartIds } })
      .toArray();

    return new Response(JSON.stringify(cartProducts), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
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

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { db } = await connectToMongoDB();

    const userId = params.id;
    const body: CartBody = await req.json();
    const productId = body.productId;

    //We use findOneAndUpdate instead of findOneAndDelete because we want to update the cartIds array,
    // if we use delete, we will delete the whole document
    //The pull operator will delete only 1 element from the cartIds array, corresponding to the productId
    //We return the updated document to see the updated cartIds array
    const deleteCart = await db
      .collection("carts")
      .findOneAndUpdate(
        { userId },
        { $pull: { cartIds: productId } },
        { returnDocument: "after" }
      );

    if (!deleteCart) {
      return new Response(
        JSON.stringify({
          message: "You have not selected any product",
          products: [],
        }),
        {
          status: 202,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    //the cartProducts is for populating the cartProducts array with the products that have the same id as the cartIds
    //So we know the exactly products that is in the cart after the delete
    const cartProducts = await db
      .collection("products")
      .find({ id: { $in: deleteCart.cartIds } })
      .toArray();

    return new Response(JSON.stringify(cartProducts), {
      status: 202,
      headers: {
        "Content-Type": "application/json",
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
