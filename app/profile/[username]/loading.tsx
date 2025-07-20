import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingProfile() {
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
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start">
                <Skeleton className="h-32 w-32 rounded-full mb-4" />
                <div className="text-center md:text-left">
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-5 w-32 mb-4" />
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                <div className="mb-6">
                  <Skeleton className="h-6 w-48 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="text-center">
                      <Skeleton className="h-8 w-16 mx-auto mb-1" />
                      <Skeleton className="h-4 w-12 mx-auto" />
                    </div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-24" />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <Skeleton className="h-10 w-full" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="p-6">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}