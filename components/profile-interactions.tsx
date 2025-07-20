"use client"

import { Button } from "@/components/ui/button"
import { Share2, MoreHorizontal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfileInteractions() {
  const { toast } = useToast()

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied!",
      description: "Profile link has been copied to your clipboard.",
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={handleShare}>
        <Share2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
}