import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingAuthors() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-[500px] mx-auto" />
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-[150px]" />
          </div>
        </Card>

        {/* Featured Authors */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <Skeleton className="h-6 w-32 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-8 w-20" />
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-16 w-full mb-4" />
                    <div className="flex gap-4 mb-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-8 w-28" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Authors */}
        <div className="mb-6">
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Skeleton className="h-6 w-32 mb-1" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                  <div className="flex gap-2 mb-3">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-12 w-full mb-4" />
                  <div className="flex gap-4 mb-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-28" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Skeleton className="h-10 w-40 mx-auto" />
        </div>

        {/* Stats Section */}
        <Card className="p-8 mt-12 text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </div>
            ))}
          </div>
          <Skeleton className="h-10 w-64 mx-auto" />
        </Card>
      </div>
    </div>
  )
}