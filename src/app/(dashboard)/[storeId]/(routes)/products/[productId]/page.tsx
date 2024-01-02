import { BillboardClient } from "@/components/billboardclient"
import { SettingsForm } from "@/components/settings-form"
import prismadb from "@/lib/prismadb"
import { ProductForm } from "./components/product-form"

const Product = async({
    params
}:{params:{productId:string , storeId:string}})=>{

    const products = await prismadb.product.findUnique({
        where:{
            id:params.productId
        },
        include:{
            images:true,
        }
    })

    const categories = await prismadb.category.findMany({
        where:{
            storeId:params.storeId

        }
    })

    const sizes = await prismadb.size.findMany({
        where:{
            storeId:params.storeId
        }
    })

    const colors = await prismadb.color.findMany({
        where:{
            storeId:params.storeId
            
        }
    })


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                  <ProductForm 
                  categories={categories}
                  colors={colors}
                    sizes={sizes}
                  
                  initialData={products}/>
            </div>
        </div>
    )
}

export default Product