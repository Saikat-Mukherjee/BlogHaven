import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingEditProfile() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-32" />
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-96" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Basic Information */}
            <Card className="p-6">
              <Skeleton className="h-6 w-48 mb-6" />
              
              {/* Avatar Upload */}
              <div className="flex items-center gap-6 mb-6">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div>
                  <Skeleton className="h-10 w-32 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>

              <div className="space-y-2 mt-6">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-24 w-full" />
              </div>
            </Card>

            {/* Professional Summary */}
            <Card className="p-6">
              <Skeleton className="h-6 w-48 mb-6" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </Card>

            {/* Experience & Skills */}
            <Card className="p-6">
              <Skeleton className="h-6 w-48 mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>

              {/* Core Skills */}
              <div className="space-y-4 mb-6">
                <Skeleton className="h-4 w-32" />
                <div className="flex flex-wrap gap-2 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-24" />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </div>

              {/* Areas of Expertise */}
              <div className="space-y-4">
                <Skeleton className="h-4 w-32" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Additional Cards */}
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-48 mb-6" />
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}