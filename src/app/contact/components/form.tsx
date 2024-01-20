"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Form as UIForm } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"


const formSchema = z.object({
  fullname: z.string().min(0).max(50),
  email: z.string().email(),
  message: z.string().min(0).max(500),
})


const ContactForm = () => {
    const {toast}  = useToast() 


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          fullname: "",
          email: "",
          message: "",
        },
    })
     
      // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
          ),
          title: "Thanks for your contacting!",
          description: "We'll get back to you soon",
          duration: 500,
        })
        form.reset();
    }
    // className="mt-12 mx-auto px-4 p-8 bg-white sm:max-w-lg sm:px-8 md:rounded-xl md:px-8 sm:rounded-xl"
    return (
        <div className="flex flex-col bg-white px-8 py-4 lg:w-[600px] md:w-[500px] rounded-2xl max-w-lg " >
            <UIForm {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input  placeholder="Full Name" {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input  placeholder="Email" {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                  <Textarea
                  placeholder="Tell us a about your opinion..."
                  className="resize-none"
                  {...field}
                />
                  </FormControl>
                 
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="hover:bg-black hover:text-white transition-all border border-black">Submit</Button>
          </form>
        </UIForm>
        </div>
      )

    
}

export default ContactForm;