import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, 
      { params }:{ params : { storeId:string }}
) {
  try{
    const {userId} = auth();
    const body= await req.json();
    const {name,price,categoryId,colorId,sizeId,images,isFeatured,isArchived} = body;
    const storeId = params.storeId;
    if(!userId) return new NextResponse("Unauthenticated", {status: 401}); 

    console.log("POST PARAMS HERE===> ",params);
    if(!name) return new NextResponse("Name is required", {status: 401}); 
    if(!price) return new NextResponse("Price is required", {status: 401}); 
    if(!categoryId) return new NextResponse("Category ID is required", {status: 401}); 
    if(!colorId) return new NextResponse("Color ID is required", {status: 401}); 
    if(!sizeId) return new NextResponse("Size ID is required", {status: 401}); 
    
    if(!images || !images.length) return new NextResponse("At least one image is required", {status: 401});
    

    if(!params.storeId) return new NextResponse("Store ID is required", {status: 401}); 

    const storebyuser = await prismadb.store.findFirst({
        where:{
            id:storeId,
            userId
        }
    })

    if(!storebyuser) return new NextResponse("Unauthorized to delete someone's store", {status: 401});


    const product = await prismadb.product.create({
        data:{
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images:{
              createMany:{
                data:[
                  ...images.map((image:{url:string})=>image)
                ]
              }
            },
            isFeatured,
            isArchived, 
            storeId:storeId
        }
    })
    return new NextResponse(JSON.stringify(product), {status: 200});
  }
  catch(err){   
    console.log("PRODUCT_POST ==> ",err)
    return new NextResponse("Internal error", {status: 500});
  }
}


export async function GET(req: Request, {params}:{params:{storeId:string}}) {
    try{
      
      const {searchParams } = new URL(req.url);
      const categoryId = searchParams.get("categoryId") || undefined;
      const colorId = searchParams.get("colorId") || undefined;
      const sizeId = searchParams.get("sizeId") || undefined;
      const isFeatured = searchParams.get("isFeatured") ;


      const storeId = params.storeId; 
      console.log("GET PARAMS HERE===> ",params);
      if(!params.storeId) return new NextResponse("Store ID is required", {status: 401}); 
  
      
      const products = await prismadb.product.findMany({
          where:{
              storeId:storeId,
              categoryId,
              colorId,
              sizeId,
              isFeatured:isFeatured ? true : undefined,
              isArchived:false
          },
          include:{
            images:true,
            category:true,
            color:true,
            size:true,
          },
          orderBy:{
            createdAt:"desc"
          }
      })
      return new NextResponse(JSON.stringify(products), {status: 200});
    }
    catch(err){   
      console.log("BILLBOARD_GET ==> ",err)
      return new NextResponse("Internal error", {status: 500});
    }
  }