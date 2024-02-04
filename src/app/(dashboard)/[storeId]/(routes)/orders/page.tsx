import { OrderClient } from "./components/orderclient"
import prismadb from "@/lib/prismadb"
import axios from "axios"
import { OrderColumn } from "./components/columns"
import { formatter } from "@/lib/utils"
import { Suspense } from "react"

const OrdersPage = async({
    params
}:{params:{storeId:string}})=>{

    const orders = await prismadb.order.findMany({
        where:{
            storeId:params.storeId
        },
        include:{
           orderItems:{
            include:{
                product:true
            }
           }
        },
        orderBy:{
            createdAt:"desc"
        }
    })

    console.log("This is order Call ===> ",orders)

    const formattedOrders : OrderColumn[] = orders.map((item)=>({
        id:item.id,
        phone:item.phone,
        address:item.address,
        products:item.orderItems.map((item)=> item.product.name).join(", "),
        totalPrice:formatter.format(item.orderItems.reduce((total,item)=>{
            return total+Number(item.product.price)
        },0)),
        isPaid:item.isPaid,
        createdAt:item.createdAt.toDateString()
    })) 

    console.log("This is Formatted order Call ===> ",formattedOrders)

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders}/>
            </div>
        </div>
    )
}

export default OrdersPage