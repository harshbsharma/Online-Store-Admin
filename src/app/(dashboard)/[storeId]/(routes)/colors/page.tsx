import { ColorsClient } from "./[colorId]/components/colorclient"
import prismadb from "@/lib/prismadb"
import axios from "axios"
import { ColorColumn } from "./[colorId]/components/columns"
import { Suspense } from "react"
import { SkeletonDemo } from "./[colorId]/components/Skeleton"

const ColorsPage = async({
    params
}:{params:{storeId:string}})=>{

    const colors = await prismadb.color.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt:"desc"
        }
    })

    const formattedColors : ColorColumn[] = colors.map((item)=>({
        id:item.id,
        name:item.name,
        value:item.value,
        createdAt:item.createdAt.toDateString()
    })) 

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorsClient data={formattedColors}/>
            </div>
        </div>
    )
}

export default ColorsPage