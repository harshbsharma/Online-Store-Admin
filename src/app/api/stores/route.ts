import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, res: Response) {
  try{
    const {userId} = auth();
    const body= await req.json();
    const {name} = body;

    if(!userId) return new NextResponse("Unauthorized", {status: 401}); 

   
    if(!name) return new NextResponse("Unauthorized", {status: 401}); 

    const store  = await prismadb.store.create({
        data:{
            name,
            userId
        }
    })
    return new NextResponse(JSON.stringify(store), {status: 200});
  }
  catch(err){   
    console.log("STORE_POST ==> ",err)
    return new NextResponse("Internal error", {status: 500});
  }
}