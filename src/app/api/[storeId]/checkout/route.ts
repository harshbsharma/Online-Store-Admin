import Stripe from "stripe";

import { NextResponse } from "next/server";

import {stripe} from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders={
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"POST,DELETE,GET,PUT,OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type, Authorization",
}

export async function OPTIONS(req: Request) {
    return NextResponse.json({},{headers:corsHeaders})
}

export async function POST(
    req: Request,
    {params}:{params:{storeId:string}}
){
    const {productIds}  = await req.json();
    if(!productIds || !productIds.length) return new NextResponse("Product Ids are required", {status: 401});
    
    const products = await prismadb.product.findMany({ 
        where:{
            id:{
                in:productIds
            }
        }
    })

    const line_items:Stripe.Checkout.SessionCreateParams.LineItem[] =[]

    products.forEach((product)=>{
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:product.name,
                },
                unit_amount:product.price.toNumber()*100 
            },
            quantity:1
        })
    })

    const order = await prismadb.order.create({
        data:{
            storeId:params.storeId,
            isPaid:false,
            orderItems:{
                create:productIds.map((productId:string)=>({
                    product:{
                        connect:{
                            id:productId
                        }
                    }
                }))
            }
        }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        billing_address_collection: 'required',
        phone_number_collection: {
            enabled: true
        },
        success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
        cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
        metadata:{
            orderId:order.id
        }
    });

    return NextResponse.json({url:session.url},{headers:corsHeaders})
}