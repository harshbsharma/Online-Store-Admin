import { SizeClient } from "./[sizeId]/components/sizeclient"
import prismadb from "@/lib/prismadb"
import axios from "axios"
import { SizeColumn } from "./[sizeId]/components/columns"

const SizesPage = async({
    params
}:{params:{storeId:string}})=>{

    const sizes = await prismadb.size.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt:"desc"
        }
    })

    const formattedSizes : SizeColumn[] = sizes.map((item)=>({
        id:item.id,
        name:item.name,
        value:item.value,
        createdAt:item.createdAt.toDateString()
    })) 

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes}/>
            </div>
        </div>
    )
}

export default SizesPage