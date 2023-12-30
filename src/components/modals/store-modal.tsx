"use client"
import * as z from 'zod'
import { useStoreModal } from "../../../hooks/use-store-modal";
import { Modal } from "../ui/modal"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem,
     FormLabel, 
     FormMessage
    } from '../ui/form';

import { Input } from '../ui/input';    
import { Button } from '../ui/button';  
import { use, useState } from 'react';
import axios from 'axios';
import {useRouter} from "next/navigation"

const formSchema = z.object({
    name: z.string().min(1)
})






export const StoreModal=()=>
{

    const storeModal = useStoreModal();
    const router = useRouter();
    const[loading, setLoading] = useState(false);   

    const form  = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {   
        console.log(data);
        try{
            setLoading(true);
            const response  = await axios.post('/api/stores', data);
            toast.success("Store created successfully",{
                position: toast.POSITION.TOP_LEFT
            })
            // router.push(`/${response.data.id}`)           
            window.location.assign(`/${response.data.id}`) 
            // You can try window.location.assign(`/${response.data.id}`) 
            // if router.push doesn't work
        }
        catch(err)
        {
            toast.error("Error in creating store",{
                position: toast.POSITION.TOP_LEFT
              });
        }
        finally{
            setLoading(false);
        }
    }

    
    return(
    <Modal 
    title="Create Store"
    description="Add new store to manage product and caetgories"
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
    >
    <div>
    
        <div className='space-y-4 py-2 pb-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control}
                    name='name'
                    render={({ field })=>(
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='E-commerce' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        
                    )}
                    />

                    <div className='pt-6 space-x-2 flex items-center justify-end w-full '>
                        
                        <Button 
                            disabled={loading} 
                            type='submit'
                        >
                            Continue
                        </Button>

                        <Button
                            disabled={loading} 
                            variant='destructive'
                            onClick={storeModal.onClose}
                        >
                            Cancel
                        </Button>

                    </div>

                </form>
            </Form>
        </div>
    </div>
    </Modal>
    )
}