
'use client';

import { Category, Color, Image, Product, Size } from "@prisma/client";
import { Heading } from "../../../../../../../components/ui/heading";
import { Button } from "../../../../../../../components/ui/button";
import { FileDiff, Trash } from "lucide-react";
import { Separator } from "../../../../../../../components/ui/separator";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../../../../../components/ui/form";
import { Input } from "../../../../../../../components/ui/input";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams,useRouter } from "next/navigation";
import { AlertModal } from "../../../../../../../components/modals/alert-modal";
import { ApiAlert } from "../../../../../../../components/ui/api-alert";
import { useOrigin } from "../../../../../../../../hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";



const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({url:z.string()}).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    sizeId: z.string().min(1),
    colorId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional() 
})

type ProductFromValues = z.infer<typeof formSchema>

interface ProductFormProps {
    initialData:Product & {
        images:Image[]
    }| null
    categories:Category[]
    sizes:Size[]
    colors:Color[]
}


export const ProductForm:React.FC<ProductFormProps> = ({
    initialData,
    categories,
    sizes,
    colors,
})=>{

    const params  = useParams();
    const router = useRouter();
    const origin = useOrigin();
    const [open,Setopen]  = useState(false);
    const [loading,Setloading]  = useState(false);
    const title = initialData ? "Edit Products" : "Create Products"
    const description = initialData ? "Edit a Products" : "Add a new Products"
    const toastmessage = initialData ? "Products Updated" : "Products Created"
    const action = initialData ? "Save Changes" : "Create"

    const form  = useForm<ProductFromValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            price:parseFloat(String(initialData?.price))
        } : {
            name:'',
            images:[],
            price:0,
            categoryId:'',
            sizeId:'',
            colorId:'',
            isFeatured:false,
            isArchived:false
        }
    })


    const onSubmit = async(data:ProductFromValues)=>{
        try{
            Setloading(true)
            if(initialData){
                const response = await axios.patch(`/api/${params.storeId}/products/${params.productId}`,data)
            }
            else{
                const response = await axios.post(`/api/${params.storeId}/products`,data)
            }
            router.push(`/${params.storeId}/products`)
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
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
            router.push(`/${params.storeId}/products`)
            router.refresh()
            toast.success("Product deleted successfully")
        }
        catch(err)
        {
            toast.error("Something went wrong")
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
                        name="images"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                    value={field.value.map((image)=>image.url)}
                                    disabled={loading}
                                    onChange={(url)=> field.onChange([...field.value,{url}])}
                                    onRemove={(url)=> field.onChange([...field.value.filter((current)=> current.url !== url)])}
                                    
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}  
                        />

                    <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading}
                                    placeholder="Product Name.."
                                    {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}  
                        />
                         <FormField
                        control={form.control}
                        name="price"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input 
                                    type="number" disabled={loading}
                                    placeholder="9.99"
                                    {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}  
                        />
                        <FormField
                        control={form.control}
                        name="categoryId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select disabled={loading} 
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                >   
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                        defaultValue={field.value}
                                        placeholder="Select a Category"
                                        />

                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category)=>(
                                        <SelectItem
                                        key={category.id}
                                        value={category.id}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>

                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}  
                        />

                        <FormField
                        control={form.control}
                        name="sizeId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Size</FormLabel>
                                <Select disabled={loading} 
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                >   
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                        defaultValue={field.value}
                                        placeholder="Select a Size"
                                        />

                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {sizes.map((size)=>(
                                        <SelectItem
                                        key={size.id}
                                        value={size.id}
                                        >
                                            {size.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>

                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}  
                        />
                        <FormField
                        control={form.control}
                        name="colorId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <Select disabled={loading} 
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                >   
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                        defaultValue={field.value}
                                        placeholder="Select a Color"
                                        />

                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {colors.map((color)=>(
                                        <SelectItem
                                        key={color.id}
                                        value={color.id}
                                        >
                                            {color.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>

                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}  
                        />

                        <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({field})=>(
                            <FormItem className="flex item-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange} 
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Featured
                                    </FormLabel>
                                    <FormDescription>
                                        This product will appear on the home page
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}  
                        />

                        <FormField
                        control={form.control}
                        name="isArchived"
                        render={({field})=>(
                            <FormItem className="flex item-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange} 
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Archived
                                    </FormLabel>
                                    <FormDescription>
                                        This product will not appear anywhere in the store
                                    </FormDescription>
                                </div>
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