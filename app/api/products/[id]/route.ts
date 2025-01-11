/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from "next/server";
import { connectToMongoDB } from "../../db";



type Params = {
  id: string;
};

export async function GET(req: NextRequest, { params }: {params: Params}) {
  try {
    const {db} = await connectToMongoDB()
    const productId = params.id;
  
    const product = await db.collection('products').findOne({id: productId});
  
  
      if(!product) {
          return new Response('Product not found', {
              status: 404,
          })
      }
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
