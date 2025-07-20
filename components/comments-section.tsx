"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageSquare, Send, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Comment {
  id: string
  content: string
  created_at: string
  likes: number
  replies: number
  user: {
    username: string
    full_name: string
    avatar_url: string
  }
  replies_data?: Comment[]
}

interface CommentsSectionProps {
  comments: Comment[]
}

export default function CommentsSection({ comments }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [showAllComments, setShowAllComments] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const { toast } = useToast()

  const handleComment = () => {
    if (!newComment.trim()) return
    
    toast({
      title: "Comment posted!",
      description: "Your comment has been added to the discussion.",
    })
    setNewComment("")
  }

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return
    
    toast({
      title: "Reply posted!",
      description: "Your reply has been added.",
    })
    setReplyContent("")
    setReplyingTo(null)
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const displayedComments = showAllComments ? comments : comments.slice(0, 2)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">
          Discussion ({comments.length})
        </h3>
      </div>

      {/* Add Comment */}
      <div className="mb-8">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-3"
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={handleComment} disabled={!newComment.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Comments List */}
      <div className="space-y-6">
        {displayedComments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.user.avatar_url} alt={comment.user.full_name} />
                <AvatarFallback>{comment.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{comment.user.full_name}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatTimeAgo(comment.created_at)}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed">{comment.content}</p>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Heart className="h-3 w-3 mr-1" />
                    {comment.likes}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="mt-4 ml-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                        <AvatarFallback>YU</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder={`Reply to ${comment.user.full_name}...`}
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="mb-2"
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleReply(comment.id)}
                            disabled={!replyContent.trim()}
                          >
                            Reply
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies_data && comment.replies_data.length > 0 && (
                  <div className="ml-6 mt-4 space-y-3">
                    {comment.replies_data.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.user.avatar_url} alt={reply.user.full_name} />
                          <AvatarFallback>{reply.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted/30 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{reply.user.full_name}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(reply.created_at)}
                              </span>
                            </div>
                            <p className="text-sm">{reply.content}</p>
                          </div>
                          <div className="flex items-center gap-4 mt-1">
                            <Button variant="ghost" size="sm" className="text-xs">
                              <Heart className="h-3 w-3 mr-1" />
                              {reply.likes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Comments */}
      {comments.length > 2 && !showAllComments && (
        <div className="text-center mt-6">
          <Button 
            variant="outline" 
            onClick={() => setShowAllComments(true)}
          >
            View all {comments.length} comments
          </Button>
        </div>
      )}
    </Card>
  )
}