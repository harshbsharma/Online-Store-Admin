'use client'

import React from "react"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Copy, Server } from "lucide-react"
import { Badge, BadgeProps } from "./badge"
import { Button } from "./button"
import { toast } from "react-toastify"

interface ApiAlertProps {
    title:string
    description:string
    variant:'public'|'admin'
}

const textMap:Record<ApiAlertProps['variant'],string> = {
    public:'Public API',
    admin:'Admin API'
}

const variantMap:Record<ApiAlertProps['variant'],BadgeProps['variant']> = {
    public:'secondary',
    admin:'destructive'
}

export const ApiAlert:React.FC<ApiAlertProps> = ({  
    title,
    description,
    variant,
})=>{

    const onCopy = (description:string)=>{
        navigator.clipboard.writeText(description)
        toast.success("Copied to clipboard")
    }
    return(
       <Alert>
        <Server className="w-4 h-4 mr-2" />
        <AlertTitle className="flex items-center gap-x-2">
            {title}
            <Badge variant={variantMap[variant]}>
                {textMap[variant]}
            </Badge>
        </AlertTitle>
        <AlertDescription className="mt-4 flex items-center justify-between">
            <code className="relative rounded bg-muted
            px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {description}
            </code>
            <Button variant="outline" size='icon' onClick={()=>onCopy(description)} >
                <Copy className="h-4 w-4"/>
            </Button>
        </AlertDescription>
       </Alert>
    )
}

