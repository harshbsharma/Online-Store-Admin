
'use client';

import { Color, Size } from "@prisma/client";
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
    value: z.string().min(4).regex(/^#/,{
        message:"String must be a color hex code"
    }) 
})

type ColorFromValues = z.infer<typeof formSchema>

interface ColorFormProps {
    initialData:Color | null
}


export const ColorForm:React.FC<ColorFormProps> = ({initialData})=>{

    const params  = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const [open,Setopen]  = useState(false);
    const [loading,Setloading]  = useState(false);
    const title = initialData ? "Edit Colors" : "Create Colors"
    const description = initialData ? "Edit a Colors" : "Add a new Colors"
    const toastmessage = initialData ? "Colors Updated" : "Colors Created"
    const action = initialData ? "Save Changes" : "Create"

    const form  = useForm<ColorFromValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name:'',
            value:''
        }
    })


    const onSubmit = async(data:ColorFromValues)=>{
        try{
            Setloading(true)
            if(initialData){
                const response = await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`,data)
            }
            else{
                const response = await axios.post(`/api/${params.storeId}/colors`,data)
            }
            router.push(`/${params.storeId}/colors`)
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
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            router.push(`/${params.storeId}/colors`)
            router.refresh()
            toast.success("Color deleted successfully")
        }
        catch(err)
        {
            toast.error("Remove all products using this color first")
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
                    <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading}
                                    placeholder="Color Name.."
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
                                    <div className="flex items-center gap-x-4">
                                    <Input disabled={loading}
                                    placeholder="Color Value.."
                                    {...field} />
                                    <div className="border p-4 rounded-full"
                                    style={{backgroundColor:field.value}}/>
                                    </div>
                                    
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