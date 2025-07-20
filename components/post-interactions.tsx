"use client"

import { Button } from "@/components/ui/button"
import { Bookmark, Share2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface PostInteractionsProps {
  postId: string
  initialBookmarked?: boolean
}

export default function PostInteractions({ postId, initialBookmarked = false }: PostInteractionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked)
  const { toast } = useToast()

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Bookmark removed" : "Post bookmarked",
      description: isBookmarked ? "Post removed from your bookmarks." : "Post saved to your bookmarks.",
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied!",
      description: "Post link has been copied to your clipboard.",
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBookmark}
        className={isBookmarked ? "text-blue-600" : ""}
      >
        <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
      </Button>
      <Button variant="ghost" size="sm" onClick={handleShare}>
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  )
}