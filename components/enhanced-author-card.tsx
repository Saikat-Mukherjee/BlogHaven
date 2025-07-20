"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MapPin, 
  Calendar, 
  Users, 
  BookOpen, 
  Award,
  ExternalLink,
  Star
} from "lucide-react"
import Link from "next/link"

interface EnhancedAuthorCardProps {
  author: {
    id: string
    username: string
    full_name: string
    avatar_url: string
    bio: string
    location?: string
    joined_date: string
    followers: number
    posts_count: number
    experience_level?: string
    industry_focus?: {
      primary: string
      secondary?: string
    }
    core_skills?: string[]
    achievements?: string[]
  }
  showFullProfile?: boolean
  className?: string
}

export default function EnhancedAuthorCard({ 
  author, 
  showFullProfile = false,
  className = "" 
}: EnhancedAuthorCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={author.avatar_url} alt={author.full_name} />
          <AvatarFallback>{author.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xl font-semibold">
                <Link 
                  href={`/profile/${author.username}`}
                  className="hover:text-primary transition-colors"
                >
                  {author.full_name}
                </Link>
              </h3>
              <p className="text-muted-foreground">@{author.username}</p>
            </div>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Follow
            </Button>
          </div>

          {/* Experience Level & Industry */}
          {(author.experience_level || author.industry_focus) && (
            <div className="flex flex-wrap gap-2 mb-3">
              {author.experience_level && (
                <Badge variant="secondary">{author.experience_level}</Badge>
              )}
              {author.industry_focus?.primary && (
                <Badge variant="outline">{author.industry_focus.primary}</Badge>
              )}
            </div>
          )}

          <p className="text-muted-foreground mb-4 leading-relaxed">
            {author.bio}
          </p>

          {/* Core Skills */}
          {author.core_skills && author.core_skills.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Star className="h-3 w-3" />
                Core Skills
              </h4>
              <div className="flex flex-wrap gap-1">
                {author.core_skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {author.core_skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{author.core_skills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Top Achievement */}
          {author.achievements && author.achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Award className="h-3 w-3" />
                Recent Achievement
              </h4>
              <p className="text-sm text-muted-foreground">
                {author.achievements[0]}
              </p>
            </div>
          )}

          {/* Stats & Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {author.followers.toLocaleString()} followers
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {author.posts_count} posts
            </span>
            {author.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {author.location}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Joined {formatDate(author.joined_date)}
            </span>
            
            {showFullProfile && (
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/profile/${author.username}`}>
                  View Full Profile
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}