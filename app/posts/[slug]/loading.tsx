import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingPostDetails() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-9 w-32" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
            
            <Skeleton className="h-16 w-full mb-6" />
            <Skeleton className="h-6 w-3/4 mb-8" />

            {/* Author Info */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <Skeleton className="aspect-video w-full rounded-lg mb-8" />
          </div>

          {/* Article Content */}
          <Card className="p-8 mb-8">
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
              <Skeleton className="h-8 w-1/2 mt-8" />
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </Card>

          {/* Reactions */}
          <Card className="p-6 mb-8">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-24" />
              ))}
            </div>
          </Card>

          {/* Author Bio */}
          <Card className="p-6 mb-8">
            <div className="flex items-start gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-9 w-20" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-3" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </Card>

          {/* Comments Section */}
          <Card className="p-6">
            <Skeleton className="h-6 w-32 mb-6" />
            
            {/* Add Comment */}
            <div className="mb-8">
              <div className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-20 w-full mb-3" />
                  <div className="flex justify-end">
                    <Skeleton className="h-9 w-32" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              {/* Comments */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="mb-6">
                  <div className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-20 w-full mb-2" />
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-6 w-12" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}