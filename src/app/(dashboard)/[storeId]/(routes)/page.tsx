
import { getGraphRevenue } from "@/actions/get-graph-revenue"
import { getSalesCount } from "@/actions/get-sales-count"
import { getStockCount } from "@/actions/get-stock-count"
import { getTotalRevenue } from "@/actions/get-total-revenue"
import Overview from "@/components/overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"
import { formatter } from "@/lib/utils"
import { CreditCard, IndianRupee, Package } from "lucide-react"

interface DashboardPageProps {
    params:{
        storeId:string
    }
}

const DashboardPage:React.FC<DashboardPageProps>= async({params})=>{
    


    const totalRevenue=await getTotalRevenue(params.storeId)    
    const totalSales=await getSalesCount(params.storeId)
    const productsInStock=await getStockCount(params.storeId)

    const graphRevenue = await getGraphRevenue(params.storeId)

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Dashboard" description="Overview of Your CollabHub Store" />
                <Separator/>
                <div className="grid gap-4 grid-cols-3 max-sm:grid-cols-1">

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                        
                        Total Revenue
                        <CardTitle className="text-sm font-medium">
                        <IndianRupee className="h-4 w-4 text-muted-foreground"/>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatter.format(totalRevenue)}
                        </div>
                    </CardContent>
                    
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                        
                        Total Sales
                        <CardTitle className="text-sm font-medium">
                        <CreditCard className="h-4 w-4 text-muted-foreground"/>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            +{totalSales}
                        </div>
                    </CardContent>
                    
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                        
                        Products In Stock
                        <CardTitle className="text-sm font-medium">
                        <Package className="h-4 w-4 text-muted-foreground"/>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {productsInStock}
                        </div>
                    </CardContent>
                    
                </Card>


                </div>

                <Card className="col-span-4 sm:col-span-2">
                    <CardHeader className="font-bold text-2xl">Overview</CardHeader>
                        <CardContent className="pl-2">
                            <Overview data={graphRevenue}/>
                        </CardContent>
                    
                </Card>
            </div>
        </div>
    )
}
export default DashboardPage;   
