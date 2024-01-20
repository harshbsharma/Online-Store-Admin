
'use client';

import { Size } from "@prisma/client";
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
    name: z.string().min(1),
    value: z.string().min(1) 
})

type SizeFromValues = z.infer<typeof formSchema>

interface SizeFormProps {
    initialData:Size | null
}


export const SizeForm:React.FC<SizeFormProps> = ({initialData})=>{

    const params  = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const [open,Setopen]  = useState(false);
    const [loading,Setloading]  = useState(false);
    const title = initialData ? "Edit Size" : "Create Size"
    const description = initialData ? "Edit a Size" : "Add a new Size"
    const toastmessage = initialData ? "Size Updated" : "Size Created"
    const action = initialData ? "Save Changes" : "Create"

    const form  = useForm<SizeFromValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name:'',
            value:''
        }
    })


    const onSubmit = async(data:SizeFromValues)=>{
        try{
            Setloading(true)
            if(initialData){
                const response = await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`,data)
            }
            else{
                const response = await axios.post(`/api/${params.storeId}/sizes`,data)
            }
            router.push(`/${params.storeId}/sizes`)
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
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.push(`/${params.storeId}/size`)
            router.refresh()
            toast.success("Size deleted successfully")
        }
        catch(err)
        {
            toast.error("Remove all products using this size first")
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
                    <div className="grid grid-cols-3 gap-8 max-sm:flex flex-col">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading}
                                    placeholder="Size Name.."
                                    {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}  
                        />

                        <FormField
                        control={form.control}
                        name="value"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input disabled={loading}
                                    placeholder="Size Value.."
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