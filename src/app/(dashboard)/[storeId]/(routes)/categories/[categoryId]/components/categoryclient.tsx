"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { useParams, useRouter } from "next/navigation"
import { CategoryColumn, columns } from "@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/components/columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface CategoryClientProps {  
    data:CategoryColumn[]
}
export const CategoryClient:React.FC<CategoryClientProps> =({data})=> {

    const router = useRouter();
    const params = useParams(); 


    return(
        <>
            <div className="flex items-center justify-between max-sm:flex-col gap-2 max-sm:justify-center">
                <Heading title={`Categories (${data.length})`}
                description="Manage Categories for your store"/>

                <Button onClick={()=> router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Create Categories
                </Button>
            </div>

            <Separator/>
            <DataTable searchKey="name" columns ={columns} data={data} />

            <Heading title="API" description="API calls for Categories"/>
            <Separator/>

            <ApiList entityName="categories" entityId="categoryId"/>

        </>
    )
}