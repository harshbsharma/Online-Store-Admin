"use client"

import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Heading } from "./ui/heading"
import { Separator } from "./ui/separator"
import { useParams, useRouter } from "next/navigation"
import { Billboard } from "@prisma/client"
import { BillboardColumn, columns } from "@/app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/components/columns"
import { DataTable } from "./ui/data-table"
import { ApiList } from "./ui/api-list"


interface BillboardClientProps {  
    data:BillboardColumn[]
}
export const BillboardClient:React.FC<BillboardClientProps> =({data})=> {

    const router = useRouter();
    const params = useParams(); 


    return(
        <>
            <div className="flex items-center justify-between max-sm:flex-col gap-2 max-sm:justify-center">
                <Heading title={`Billboard (${data.length})`}
                description="Manage billboards for your store"/>

                <Button onClick={()=> router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Create Billboard
                </Button>
            </div>

            <Separator/>
            <DataTable searchKey="label" columns ={columns} data={data} />

            <Heading title="API" description="API calls for Billboards"/>
            <Separator/>

            <ApiList entityName="billboards" entityId="billboardsId"/>

        </>
    )
}