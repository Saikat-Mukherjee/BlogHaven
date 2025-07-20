import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSignIn() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="text-center">
              <Skeleton className="h-8 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>

            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
              <Skeleton className="h-10 w-full" />
            </div>

            <Skeleton className="h-[1px] w-full my-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
      </div>
    </div>
  )
}