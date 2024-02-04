import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return (
    <div className="flex flex-col items-center pt-20 gap-10 w-full h-full">
        <div className="flex items-center justify-evenly w-full gap-40">
            <Skeleton className="h-10 w-20 " />
            <Skeleton className="h-10 w-20 " />
        </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
