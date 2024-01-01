
'use client';

import { Store } from "@prisma/client";
import { Heading } from "./ui/heading";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams,useRouter } from "next/navigation";
import { AlertModal } from "./modals/alert-modal";
import { ApiAlert } from "./ui/api-alert";
import { useOrigin } from "../../hooks/use-origin";
interface SettingsFormProps {
    initialData:Store
}

const formSchema = z.object({
    name: z.string().min(1)
})

type SettingsFromValues = z.infer<typeof formSchema>

export const SettingsForm:React.FC<SettingsFormProps> = ({initialData})=>{

    const params  = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const [open,Setopen]  = useState(false);
    const [loading,Setloading]  = useState(false);


    const form  = useForm<SettingsFromValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name
        }
    })


    const onSubmit = async(data:SettingsFromValues)=>{
        try{
            Setloading(true)
            const response = await axios.patch(`/api/stores/${params.storeId}`,data)
            router.refresh();
            toast.success("Store updated successfully")
        }
        catch(err)
        {
            toast.error("Something went wrong")
        }
    }

    const onDelete = async()=>{
        try{
            Setloading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push('/')
            toast.success("Store deleted successfully")
        }
        catch(err)
        {
            toast.error("Remove all products before deleting the store")
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
            title="Settings"
            description="Manage your store settings"
            />

            <Button
                size='icon'
                disabled={loading}
                onClick={()=>Setopen(true)}
            variant='destructive'
            >
                <Trash className="h-4 w-4"/>
                </Button> 

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
                                    placeholder="Store Name.."
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
                        Save Changes
                    </Button>
                </form>
            </Form>

            <Separator/>

            <ApiAlert
            title="NEXT_PUBLIC_API_URL"
            description={`${origin}/api/${params.storeId}`}
            variant='public'
            />
        </>
    )
}