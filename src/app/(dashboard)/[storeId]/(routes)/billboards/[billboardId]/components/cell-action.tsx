'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BillboardColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { toast } from "react-toastify"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionProps {
    data:BillboardColumn
}

export const CellAction:React.FC<CellActionProps>=({data})=>{


    const router = useRouter();
    const params = useParams();

    const [loading,Setloading] = useState(false)
    const[open,Setopen] = useState(false)
    
    const onCopy = (id:string)=>{
        navigator.clipboard.writeText(id)
        toast.success("Copied to clipboard")
    }

    const onDelete = async()=>{
        try{
            Setloading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
            router.refresh()
            toast.success("Billboard deleted successfully")
        }
        catch(err)
        {
            toast.error("Remove all categories before deleting the billboard")
        }
        finally{
            Setloading(false)
            Setopen(false)
        }
    }

   

 return(
    <>
        <AlertModal 
        isOpen={open} 
        onClose={()=>Setopen(false)}
        onConfirm={onDelete}
        loading={loading}
        />
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant='ghost' className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>            
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={()=> onCopy(data.id)}>
                <Copy className="mr-2 h-4 w-4"/>
                Copy ID            
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=> router.push(`/${params.storeId}/billboards/${data.id}`)}>
                <Edit className="mr-2 h-4 w-4"/>
                Update            
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=> Setopen(true)} >
                <Trash className="mr-2 h-4 w-4"/>
                Delete            
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
 )   
}