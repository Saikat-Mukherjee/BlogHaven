"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Users, Edit, UserCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface ProfileInteractionsProps {
  /** True when the logged-in user is viewing their own profile. */
  isOwnProfile: boolean
  /** The username of the profile being viewed. */
  username: string
}

export default function ProfileInteractions({ isOwnProfile, username }: ProfileInteractionsProps) {
  const { toast } = useToast()
  const [isFollowing, setIsFollowing] = useState(false)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied!",
      description: "Profile link has been copied to your clipboard.",
    })
  }

  const handleFollow = async () => {
    // TODO: Replace with actual API call to follow/unfollow user
    // await fetch(`/api/users/${username}/follow`, { method: isFollowing ? 'DELETE' : 'POST' })
    setIsFollowing(prev => !prev)
    toast({
      title: isFollowing ? "Unfollowed" : "Now Following",
      description: isFollowing
        ? `You unfollowed @${username}.`
        : `You are now following @${username}.`,
    })
  }

  return (
    <div className="flex items-center gap-2">
      {isOwnProfile ? (
        <Button variant="outline" size="sm" asChild>
          <Link href="/profile/edit">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Link>
        </Button>
      ) : (
        <Button
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          onClick={handleFollow}
        >
          {isFollowing ? (
            <UserCheck className="h-4 w-4 mr-2" />
          ) : (
            <Users className="h-4 w-4 mr-2" />
          )}
          {isFollowing ? "Following" : "Follow"}
        </Button>
      )}
      <Button variant="ghost" size="sm" onClick={handleShare}>
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  )
}