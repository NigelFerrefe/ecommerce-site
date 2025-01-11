import { connectToMongoDB } from "../db";


export async function GET() {
  try {

    const {db} = await connectToMongoDB()
  
    const products = await db.collection('products').find({}).toArray()
  
    return new Response(JSON.stringify(products), {
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
