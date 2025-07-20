import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingCreateBlog() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Skeleton className="h-10 w-64 mb-8" />
          
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-24 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-64 w-full" />
              </div>

              <div className="flex justify-end gap-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}