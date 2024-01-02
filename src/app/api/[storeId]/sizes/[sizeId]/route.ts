import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}:{params:{sizeId:string}}
) {
    try{
       
        if(!params.sizeId) return new NextResponse("Size Id is Reqiured", {status: 401}); 
    
        const size  = await prismadb.size.deleteMany({
            where:{
                id:params.sizeId
            }
        })
        return new NextResponse(JSON.stringify(size), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("SIZE_GET ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


export async function PATCH(
    req: Request,
    {params}:{params:{storeId:string ,sizeId:string}}
) {
    try{
        const {userId} = auth();
        const {storeId} = params;
        const body= await req.json();
        const {name,value} = body;
    

        if(!userId) return new NextResponse("Unauthorized", {status: 401})
        if(!name) return new NextResponse("Name is Required", {status: 401})
        if(!value) return new NextResponse("Size is Reqiured", {status: 401}); 
        if(!params.sizeId) return new NextResponse("Size ID is Reqiured", {status: 401}); 
    
        const storebyuser = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storebyuser) return new NextResponse("Unauthorized", {status: 401});
    
        const size  = await prismadb.size.updateMany({
            where:{
                id:params.sizeId
            },
            data:{
                name,
                value
            }
        })
        return new NextResponse(JSON.stringify(size), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("SIZE_PATCH ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


export async function DELETE(
    req: Request,
    {params}:{params:{sizeId:string, storeId:string}}
) {
    try{
        const {userId} = auth();
        
    
        if(!userId) return new NextResponse("Unauthorized", {status: 401})
      
        if(!params.sizeId) return new NextResponse("Size Id is Reqiured", {status: 401}); 
    
    
        const storebyuser = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storebyuser) return new NextResponse("Unauthorized", {status: 401});


        const size  = await prismadb.size.deleteMany({
            where:{
                id:params.sizeId
            }
        })
        return new NextResponse(JSON.stringify(size), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("SIZE_DELETE ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


