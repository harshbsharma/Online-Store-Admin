import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}:{params:{colorId:string}}
) {
    try{
       
        if(!params.colorId) return new NextResponse("Color Id is Reqiured", {status: 401}); 
    
        const color  = await prismadb.color.findUnique({
            where:{
                id:params.colorId
            }
        })
        return new NextResponse(JSON.stringify(color), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("COLOR_GET ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


export async function PATCH(
    req: Request,
    {params}:{params:{storeId:string ,colorId:string}}
) {
    try{
        const {userId} = auth();
        const {storeId} = params;
        const body= await req.json();
        const {name,value} = body;
    

        if(!userId) return new NextResponse("Unauthorized", {status: 401})
        if(!name) return new NextResponse("Name is Required", {status: 401})
        if(!value) return new NextResponse("Value is Reqiured", {status: 401}); 
        if(!params.colorId) return new NextResponse("Color ID is Reqiured", {status: 401}); 
    
        const storebyuser = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storebyuser) return new NextResponse("Unauthorized", {status: 401});
    
        const color  = await prismadb.color.update({
            where:{
                id:params.colorId
            },
            data:{
                name,
                value
            }
        })
        return new NextResponse(JSON.stringify(color), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("COLOR_PATCH ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


export async function DELETE(
    req: Request,
    {params}:{params:{colorId:string, storeId:string}}
) {
    try{
        const {userId} = auth();
        
    
        if(!userId) return new NextResponse("Unauthorized", {status: 401})
      
        if(!params.colorId) return new NextResponse("Color Id is Reqiured", {status: 401}); 
    
    
        const storebyuser = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storebyuser) return new NextResponse("Unauthorized", {status: 401});


        const color  = await prismadb.color.delete({
            where:{
                id:params.colorId
            }
        })
        return new NextResponse(JSON.stringify(color), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("COLOR_DELETE ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


