"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

type ApiComment = {
  id: number
  parent_id: number | null
  content: string | null
  author_username: string | null
  created_at: string
  updated_at: string
  deleted: boolean
  edited: boolean
  reply_count: number
}

interface CommentsSectionProps {
  postSlug: string
}

export default function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<ApiComment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [isPostingReply, setIsPostingReply] = useState(false)
  const [loadedReplies, setLoadedReplies] = useState<Record<number, ApiComment[]>>({})
  const [loadingReplies, setLoadingReplies] = useState<Record<number, boolean>>({})
  const { toast } = useToast()

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/posts/${postSlug}/comments?page=0&size=20`)
        if (!res.ok) return
        const data = await res.json()
        setComments(Array.isArray(data) ? data : (data.content ?? []))
      } catch (err) {
        console.error("Failed to load comments:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchComments()
  }, [postSlug])

  const handlePostComment = async () => {
    if (!newComment.trim()) return
    setIsPosting(true)
    try {
      const res = await fetch(`/api/posts/${postSlug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment.trim() }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        toast({ title: "Error", description: err.error ?? "Failed to post comment.", variant: "destructive" })
        return
      }
      const created: ApiComment = await res.json()
      setComments(prev => [...prev, created])
      setNewComment("")
      toast({ title: "Comment posted!", description: "Your comment has been added." })
    } catch {
      toast({ title: "Error", description: "Failed to post comment.", variant: "destructive" })
    } finally {
      setIsPosting(false)
    }
  }

  const loadReplies = async (commentId: number) => {
    if (loadedReplies[commentId]) return
    setLoadingReplies(prev => ({ ...prev, [commentId]: true }))
    try {
      const res = await fetch(`/api/posts/${postSlug}/comments/${commentId}/replies?page=0&size=20`)
      if (!res.ok) return
      const data = await res.json()
      setLoadedReplies(prev => ({
        ...prev,
        [commentId]: Array.isArray(data) ? data : (data.content ?? []),
      }))
    } catch (err) {
      console.error("Failed to load replies:", err)
    } finally {
      setLoadingReplies(prev => ({ ...prev, [commentId]: false }))
    }
  }

  const handlePostReply = async (commentId: number) => {
    if (!replyContent.trim()) return
    setIsPostingReply(true)
    try {
      const res = await fetch(`/api/posts/${postSlug}/comments/${commentId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyContent.trim() }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        toast({ title: "Error", description: err.error ?? "Failed to post reply.", variant: "destructive" })
        return
      }
      const created: ApiComment = await res.json()
      setLoadedReplies(prev => ({
        ...prev,
        [commentId]: [...(prev[commentId] ?? []), created],
      }))
      setComments(prev =>
        prev.map(c => c.id === commentId ? { ...c, reply_count: c.reply_count + 1 } : c)
      )
      setReplyContent("")
      setReplyingTo(null)
      toast({ title: "Reply posted!", description: "Your reply has been added." })
    } catch {
      toast({ title: "Error", description: "Failed to post reply.", variant: "destructive" })
    } finally {
      setIsPostingReply(false)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Discussion ({comments.length})</h3>
      </div>

      {/* Add Comment */}
      <div className="mb-8">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
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
              <Button onClick={handlePostComment} disabled={!newComment.trim() || isPosting}>
                <Send className="h-4 w-4 mr-2" />
                {isPosting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Comments List */}
      {isLoading ? (
        <p className="text-muted-foreground text-sm text-center py-4">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-4">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {comment.deleted || !comment.author_username
                      ? "?"
                      : comment.author_username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className={`rounded-lg p-4 ${comment.deleted ? "bg-muted/30 border border-dashed" : "bg-muted/50"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">
                        {comment.deleted ? "[deleted]" : comment.author_username}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(comment.created_at)}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${comment.deleted ? "text-muted-foreground italic" : ""}`}>
                      {comment.deleted ? "[This comment has been deleted]" : comment.content}
                    </p>
                  </div>

                  {!comment.deleted && (
                    <div className="flex items-center gap-4 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          setReplyingTo(replyingTo === comment.id ? null : comment.id)
                          setReplyContent("")
                        }}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                      {comment.reply_count > 0 && !loadedReplies[comment.id] && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          disabled={!!loadingReplies[comment.id]}
                          onClick={() => loadReplies(comment.id)}
                        >
                          <ChevronDown className="h-3 w-3 mr-1" />
                          {loadingReplies[comment.id]
                            ? "Loading..."
                            : `View ${comment.reply_count} ${comment.reply_count === 1 ? "reply" : "replies"}`}
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 ml-4">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>YU</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder={`Reply to ${comment.author_username}...`}
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="mb-2"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handlePostReply(comment.id)}
                              disabled={!replyContent.trim() || isPostingReply}
                            >
                              {isPostingReply ? "Posting..." : "Reply"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => { setReplyingTo(null); setReplyContent("") }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Loaded Replies */}
                  {loadedReplies[comment.id] && loadedReplies[comment.id].length > 0 && (
                    <div className="ml-6 mt-4 space-y-3">
                      {loadedReplies[comment.id].map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {reply.deleted || !reply.author_username
                                ? "?"
                                : reply.author_username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className={`rounded-lg p-3 ${reply.deleted ? "bg-muted/30 border border-dashed" : "bg-muted/30"}`}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">
                                  {reply.deleted ? "[deleted]" : reply.author_username}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(reply.created_at)}
                                </span>
                              </div>
                              <p className={`text-sm ${reply.deleted ? "text-muted-foreground italic" : ""}`}>
                                {reply.deleted ? "[This reply has been deleted]" : reply.content}
                              </p>
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
      )}
    </Card>
  )
}