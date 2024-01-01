
'use client';

import { Billboard, Category, Store } from "@prisma/client";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1) 
})

type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
    initialData:Category | null
    billboards:Billboard[]
}


export const CategoryForm:React.FC<CategoryFormProps> = ({initialData,billboards})=>{

    const params  = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const [open,Setopen]  = useState(false);
    const [loading,Setloading]  = useState(false);
    const title = initialData ? "Edit category" : "Create category"
    const description = initialData ? "Edit a Category" : "Add a new Category"
    const toastmessage = initialData ? "Category Updated" : "Category Created"
    const action = initialData ? "Save Changes" : "Create"

    const form  = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name:'',
            billboardId:''
        }
    })


    const onSubmit = async(data:CategoryFormValues)=>{
        try{
            Setloading(true)
            if(initialData){
                const response = await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`,data)
            }
            else{
                const response = await axios.post(`/api/${params.storeId}/categories`,data)
            }
            router.push(`/${params.storeId}/categories`)
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
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
            router.push(`/${params.storeId}/categories`)
            router.refresh()
            toast.success("Category deleted successfully")
        }
        catch(err)
        {
            toast.error("Remove all products before deleting the category")
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading}
                                    placeholder="Category Name.."
                                    {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}  
                        />

                        <FormField
                        control={form.control}
                        name="billboardId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Billboard</FormLabel>
                                <Select disabled={loading} 
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                >   
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                        defaultValue={field.value}
                                        placeholder="Select a billboard"
                                        />

                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {billboards.map((billboard)=>(
                                        <SelectItem
                                        key={billboard.id}
                                        value={billboard.id}
                                        >
                                            {billboard.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>

                                </Select>
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