"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { useParams, useRouter } from "next/navigation"
import { SizeColumn, columns } from "@/app/(dashboard)/[storeId]/(routes)/sizes/[sizeId]/components/columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface SizeClientProps {  
    data:SizeColumn[]
}
export const SizeClient:React.FC<SizeClientProps> =({data})=> {

    const router = useRouter();
    const params = useParams(); 


    return(
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Sizes (${data.length})`}
                description="Manage Sizes for your store"/>

                <Button onClick={()=> router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Create Sizes
                </Button>
            </div>

            <Separator/>
            <DataTable searchKey="name" columns ={columns} data={data} />

            <Heading title="API" description="API calls for Sizes"/>
            <Separator/>

            <ApiList entityName="sizes" entityId="sizeId"/>

        </>
    )
}