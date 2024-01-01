import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}:{params:{categoryId:string}}
) {
    try{
       
        if(!params.categoryId) return new NextResponse("Category Id is Reqiured", {status: 401}); 
    
        const category  = await prismadb.category.deleteMany({
            where:{
                id:params.categoryId
            }
        })
        return new NextResponse(JSON.stringify(category), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("CATEGORY_GET ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


export async function PATCH(
    req: Request,
    {params}:{params:{storeId:string ,categoryId:string}}
) {
    try{
        const {userId} = auth();
        const {storeId} = params;
        const body= await req.json();
        const {name,billboardId} = body;
    

        if(!userId) return new NextResponse("Unauthorized", {status: 401})
        if(!name) return new NextResponse("Name is Required", {status: 401})
        if(!billboardId) return new NextResponse("Billboard ID is Reqiured", {status: 401}); 
        if(!params.categoryId) return new NextResponse("Category ID is Reqiured", {status: 401}); 
    
        const storebyuser = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storebyuser) return new NextResponse("Unauthorized", {status: 401});
    
        const category  = await prismadb.category.updateMany({
            where:{
                id:params.categoryId
            },
            data:{
                name,
                billboardId
            }
        })
        return new NextResponse(JSON.stringify(category), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("CATEGORY_PATCH ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


export async function DELETE(
    req: Request,
    {params}:{params:{categoryId:string, storeId:string}}
) {
    try{
        const {userId} = auth();
        
    
        if(!userId) return new NextResponse("Unauthorized", {status: 401})
      
        if(!params.categoryId) return new NextResponse("Category Id is Reqiured", {status: 401}); 
    
    
        const storebyuser = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storebyuser) return new NextResponse("Unauthorized", {status: 401});


        const category  = await prismadb.category.deleteMany({
            where:{
                id:params.categoryId
            }
        })
        return new NextResponse(JSON.stringify(category), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("CATEGORY_DELETE ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


