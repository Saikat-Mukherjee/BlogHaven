import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingPosts() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <Skeleton className="h-12 w-48" />
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Skeleton className="h-10 w-[300px]" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
        </div>

        <Skeleton className="h-[1px] w-full my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-full">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
                
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}