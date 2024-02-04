import { BillboardClient } from "@/components/billboardclient"
import { SettingsForm } from "@/components/settings-form"
import prismadb from "@/lib/prismadb"
import {  SizeForm } from "./components/size-form"
import { Suspense } from "react"

const SizePage = async({
    params
}:{params:{sizeId:string}})=>{

    const size = await prismadb.size.findUnique({
        where:{
            id:params.sizeId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Suspense fallback={<div>Loading...</div>}>
                  <SizeForm initialData={size}/>
                  </Suspense>
            </div>
        </div>
    )
}

export default SizePage