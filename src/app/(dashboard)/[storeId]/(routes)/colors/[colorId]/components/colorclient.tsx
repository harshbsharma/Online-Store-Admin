"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { useParams, useRouter } from "next/navigation"
import { ColorColumn, columns } from "@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/components/columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ColorsClientProps {  
    data:ColorColumn[]
}
export const ColorsClient:React.FC<ColorsClientProps> =({data})=> {

    const router = useRouter();
    const params = useParams(); 


    return(
        <>
            <div className="flex items-center justify-between max-sm:flex-col gap-2 max-sm:justify-center">
                <Heading title={`Colors (${data.length})`}
                description="Manage Colors for your store"/>

                <Button onClick={()=> router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Create Colors
                </Button>
            </div>

            <Separator/>
            <DataTable searchKey="name" columns ={columns} data={data} />

            <Heading title="API" description="API calls for Colors"/>
            <Separator/>

            <ApiList entityName="colors" entityId="colorId"/>

        </>
    )
}