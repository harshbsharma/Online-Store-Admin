import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}:{params:{productId:string}}
) {
    try{
       
        if(!params.productId) return new NextResponse("Product Id is Required", {status: 401}); 
    
        const product  = await prismadb.product.findUnique({
            where:{
                id:params.productId
            },
            include:{
                images:true,
                category:true,
                color:true,
                size:true,
            }
        })
        return new NextResponse(JSON.stringify(product), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("PRODUCT_GET ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


export async function PATCH(
    req: Request,
    {params}:{params:{storeId:string ,productId:string}}
) {
    try{
        const {userId} = auth();
        const {storeId} = params;
        const body= await req.json();
        const {name,price,categoryId,colorId,sizeId,images,isFeatured,isArchived} = body;
    

        if(!userId) return new NextResponse("Unauthorized", {status: 401})
        if(!name) return new NextResponse("Name is required", {status: 401}); 
        if(!price) return new NextResponse("Price is required", {status: 401}); 
        if(!categoryId) return new NextResponse("Category ID is required", {status: 401}); 
        if(!colorId) return new NextResponse("Color ID is required", {status: 401}); 
        if(!sizeId) return new NextResponse("Size ID is required", {status: 401}); 
        if(!params.productId) return new NextResponse("Billboard ID is Reqiured", {status: 401}); 
    
        const storebyuser = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storebyuser) return new NextResponse("Unauthorized", {status: 401});
    
        await prismadb.product.update({
            where:{
                id:params.productId
            },
            data:{
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images:{
                  deleteMany:{}
                },
                isFeatured,
                isArchived
            }
        })

        const product = await prismadb.product.update({
            where:{
                id:params.productId
            },
            data:{
                images:{
                    createMany:{
                        data:[
                            ...images.map((image:{url:string})=>image)
                        ]
                    }
                }
            }
        })

        return new NextResponse(JSON.stringify(product), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("PRODUCT_PATCH ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


export async function DELETE(
    req: Request,
    {params}:{params:{productId:string, storeId:string}}
) {
    try{
        const {userId} = auth();
        
    
        if(!userId) return new NextResponse("Unauthorized", {status: 401})
      
        if(!params.productId) return new NextResponse("Product Id is Reqiured", {status: 401}); 
    
    
        const storebyuser = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storebyuser) return new NextResponse("Unauthorized", {status: 401});


        const product  = await prismadb.product.delete({
            where:{
                id:params.productId
            }
        })
        return new NextResponse(JSON.stringify(product), {status: 200});
        // can also try NextResponse.json(store)
      }
      catch(err){   
        console.log("PRODUCT_DELETE ==> ",err)
        return new NextResponse("Internal error", {status: 500});
      }    
}


