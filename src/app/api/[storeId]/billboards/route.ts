import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, 
      { params }:{ params : { storeId:string }}
) {
  try{
    const {userId} = auth();
    const body= await req.json();
    const {label,imageUrl} = body;
    const storeId = params.storeId;
    if(!userId) return new NextResponse("Unauthenticated", {status: 401}); 

    console.log("POST PARAMS HERE===> ",params);
    if(!label) return new NextResponse("Lable is required", {status: 401}); 
    
    if(!imageUrl) return new NextResponse("Image URL is required", {status: 401}); 

    if(!params.storeId) return new NextResponse("Store ID is required", {status: 401}); 

    const storebyuser = await prismadb.store.findFirst({
        where:{
            id:storeId,
            userId
        }
    })

    if(!storebyuser) return new NextResponse("Unauthorized to delete someone's store", {status: 401});


    const billboard = await prismadb.billboard.create({
        data:{
            label,
            imageUrl,
            storeId:storeId
        }
    })
    return new NextResponse(JSON.stringify(billboard), {status: 200});
  }
  catch(err){   
    console.log("BILLBOARD_POST ==> ",err)
    return new NextResponse("Internal error", {status: 500});
  }
}


export async function GET(req: Request, {params}:{params:{storeId:string}}) {
    try{
      
      const storeId = params.storeId; 
      console.log("GET PARAMS HERE===> ",params);
      if(!params.storeId) return new NextResponse("Store ID is required", {status: 401}); 
  
      
      const billboard = await prismadb.billboard.findMany({
          where:{
              storeId:storeId
          }
      
      })
      return new NextResponse(JSON.stringify(billboard), {status: 200});
    }
    catch(err){   
      console.log("BILLBOARD_GET ==> ",err)
      return new NextResponse("Internal error", {status: 500});
    }
  }