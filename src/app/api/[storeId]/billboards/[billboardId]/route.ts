import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}:{params:{billboardId:string}}
) {
    try{
       
        if(!params.billboardId) return new NextResponse("Billboard Id is Reqiured", {status: 401}); 
    
        const billboard  = await prismadb.billboard.findUnique({
            where:{
                id:params.billboardId
            }
        })
        return new NextResponse(JSON.stringify(billboard), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("BILLBOARD_GET ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


export async function PATCH(
    req: Request,
    {params}:{params:{storeId:string ,billboardId:string}}
) {
    try{
        const {userId} = auth();
        const {storeId} = params;
        const body= await req.json();
        const {label,imageUrl} = body;
    

        if(!userId) return new NextResponse("Unauthorized", {status: 401})
        if(!label) return new NextResponse("Label is Required", {status: 401})
        if(!imageUrl) return new NextResponse("Image URL is Reqiured", {status: 401}); 
        if(!params.billboardId) return new NextResponse("Billboard ID is Reqiured", {status: 401}); 
    
        const storebyuser = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storebyuser) return new NextResponse("Unauthorized", {status: 401});
    
        const billboard  = await prismadb.billboard.updateMany({
            where:{
                id:params.billboardId
            },
            data:{
                label,
                imageUrl
            }
        })
        return new NextResponse(JSON.stringify(billboard), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("BILLBOARD_PATCH ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


export async function DELETE(
    req: Request,
    {params}:{params:{billboardId:string, storeId:string}}
) {
    try{
        const {userId} = auth();
        
    
        if(!userId) return new NextResponse("Unauthorized", {status: 401})
      
        if(!params.billboardId) return new NextResponse("Billboard Id is Reqiured", {status: 401}); 
    
    
        const storebyuser = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storebyuser) return new NextResponse("Unauthorized", {status: 401});


        const billboard  = await prismadb.billboard.delete({
            where:{
                id:params.billboardId
            }
        })
        return new NextResponse(JSON.stringify(billboard), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("BILLBOARD_DELETE ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


