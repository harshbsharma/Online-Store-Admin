import { BillboardClient } from "@/components/billboardclient"
import prismadb from "@/lib/prismadb"

import { CategoryColumn } from "./[categoryId]/components/columns"
import { CategoryClient } from "./[categoryId]/components/categoryclient"
import { Suspense } from "react"


const CategoriesPage = async({
    params
}:{params:{storeId:string}})=>{

    const categories = await prismadb.category.findMany({
        where:{
            storeId:params.storeId
        },
        include:{
            billboard:true
        },
        orderBy:{
            createdAt:"desc"
        }
    })

    const formattedCategories:CategoryColumn[]=categories.map((item)=>({
        id:item.id,
        name:item.name,
        billboardLable:item.billboard.label,
        createdAt:item.createdAt.toLocaleString()

    })) 

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories}/>
            </div>
        </div>
    )
}

export default CategoriesPage