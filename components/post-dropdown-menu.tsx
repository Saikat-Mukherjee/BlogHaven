"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  MoreHorizontal, 
  Edit2, 
  Eye, 
  Copy, 
  Share2, 
  Archive, 
  Trash2,
  BarChart3,
  Calendar,
  Settings
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface PostDropdownMenuProps {
  postId: string
  postTitle: string
  postStatus: string
  postSlug?: string
  onDelete?: () => void
  onArchive?: () => void
  onDuplicate?: () => void
}

export default function PostDropdownMenu({ 
  postId, 
  postTitle, 
  postStatus, 
  postSlug,
  onDelete,
  onArchive,
  onDuplicate 
}: PostDropdownMenuProps) {
  const { toast } = useToast()

  const handleCopyLink = () => {
    const url = postSlug ? `${window.location.origin}/posts/${postSlug}` : `${window.location.origin}/posts/${postId}`
    navigator.clipboard.writeText(url)
    toast({
      title: "Link copied!",
      description: "Post link has been copied to your clipboard.",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: postTitle,
        url: postSlug ? `${window.location.origin}/posts/${postSlug}` : `${window.location.origin}/posts/${postId}`
      })
    } else {
      handleCopyLink()
    }
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) {
      onDelete?.()
      toast({
        title: "Post deleted",
        description: "The blog post has been permanently deleted.",
      })
    }
  }

  const handleArchive = () => {
    onArchive?.()
    toast({
      title: "Post archived",
      description: "The blog post has been moved to archive.",
    })
  }

  const handleDuplicate = () => {
    onDuplicate?.()
    toast({
      title: "Post duplicated",
      description: "A copy of the post has been created as a draft.",
    })
  }

  const handleSchedule = () => {
    toast({
      title: "Coming soon",
      description: "Post scheduling feature will be available soon.",
    })
  }

  const handleAnalytics = () => {
    toast({
      title: "Coming soon",
      description: "Post analytics feature will be available soon.",
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/edit/${postId}`} className="flex items-center">
            <Edit2 className="mr-2 h-4 w-4" />
            Edit post
          </Link>
        </DropdownMenuItem>
        
        {postStatus === "published" && (
          <DropdownMenuItem asChild>
            <Link href={`/posts/${postSlug || postId}`} className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              View post
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={handleCopyLink}>
          <Copy className="mr-2 h-4 w-4" />
          Copy link
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share post
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleDuplicate}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>

        {postStatus === "published" && (
          <DropdownMenuItem onClick={handleAnalytics}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={handleSchedule}>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleArchive}>
          <Archive className="mr-2 h-4 w-4" />
          Archive
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={handleDelete}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}