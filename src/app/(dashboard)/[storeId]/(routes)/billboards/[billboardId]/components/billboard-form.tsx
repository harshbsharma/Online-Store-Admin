
'use client';

import { Billboard, Store } from "@prisma/client";
import { Heading } from "../../../../../../../components/ui/heading";
import { Button } from "../../../../../../../components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "../../../../../../../components/ui/separator";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../../../../components/ui/form";
import { Input } from "../../../../../../../components/ui/input";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams,useRouter } from "next/navigation";
import { AlertModal } from "../../../../../../../components/modals/alert-modal";
import { ApiAlert } from "../../../../../../../components/ui/api-alert";
import { useOrigin } from "../../../../../../../../hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";



const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1) 
})

type BillboardFromValues = z.infer<typeof formSchema>

interface BillboardFormProps {
    initialData:Billboard | null
}


export const BillBoardForm:React.FC<BillboardFormProps> = ({initialData})=>{

    const params  = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const [open,Setopen]  = useState(false);
    const [loading,Setloading]  = useState(false);
    const title = initialData ? "Edit billboard" : "Create Billboard"
    const description = initialData ? "Edit a Billboard" : "Add a new Billboard"
    const toastmessage = initialData ? "Billboard Updated" : "Billboard Created"
    const action = initialData ? "Save Changes" : "Create"

    const form  = useForm<BillboardFromValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label:'',
            imageUrl:''
        }
    })


    const onSubmit = async(data:BillboardFromValues)=>{
        try{
            Setloading(true)
            if(initialData){
                const response = await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`,data)
            }
            else{
                const response = await axios.post(`/api/${params.storeId}/billboards`,data)
            }
            router.push(`/${params.storeId}/billboards`)
            router.refresh();
            toast.success(toastmessage)
        }
        catch(err)
        {
            toast.error("Something went wrong")
        }
        finally{
            Setloading(false)
        }
    }

    const onDelete = async()=>{
        try{
            Setloading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.push(`/${params.storeId}/billboards`)
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
            <div className="flex items-center justify-between">
            <Heading 
            title={title}
            description={description}
            />
            {initialData && (
            <Button
                size='icon'
                disabled={loading}
                onClick={()=>Setopen(true)}
            variant='destructive'
            >
                <Trash className="h-4 w-4"/>
                </Button> 
            )}
            </div>

            <Separator/>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full" 
                >
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                    value={field.value ? [field.value] : []}
                                    disabled={loading}
                                    onChange={(url)=> field.onChange(url)}
                                    onRemove={()=> field.onChange('')}
                                    
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}  
                        />

                    <div className="grid grid-cols-3 gap-8 max-sm:flex flex-col">
                    <FormField
                        control={form.control}
                        name="label"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input disabled={loading}
                                    placeholder="Billboard Label.."
                                    {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}  
                        />
                    </div>
                    <Button 
                    disabled={loading}
                    className="ml-auto"
                    type="submit">
                        {action}
                    </Button>
                </form>
            </Form>

            <Separator/>

           
        </>
    )
}