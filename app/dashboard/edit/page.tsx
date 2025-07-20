"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect, Suspense } from "react"
import RichTextEditor from "@/components/rich-text-editor"
import { ArrowLeft, Save, Eye, Trash2, Calendar, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

// Mock data - in a real app, this would come from your database
const mockPosts = {
  "1": {
    id: "1",
    title: "The Complete Guide to Remote Team Management in 2024",
    excerpt: "Discover proven strategies for managing distributed teams, from communication tools to performance tracking and team culture building.",
    content: `<h2>Introduction</h2><p>Remote work has become the new normal for many organizations worldwide. As we navigate through 2024, the challenges and opportunities of managing distributed teams continue to evolve.</p><h2>Key Strategies</h2><p>Effective remote team management requires a combination of the right tools, clear communication protocols, and a strong company culture that transcends physical boundaries.</p><h3>Communication Tools</h3><p>The foundation of successful remote teams lies in robust communication infrastructure. Tools like Slack, Microsoft Teams, and Zoom have become essential, but it's not just about having the tools—it's about using them effectively.</p><h3>Performance Tracking</h3><p>Traditional performance metrics may not apply to remote work. Focus on outcomes rather than hours worked, and establish clear KPIs that align with business objectives.</p><h2>Building Team Culture</h2><p>Creating a strong team culture remotely requires intentional effort. Regular virtual team building activities, clear values communication, and fostering informal interactions are crucial.</p><h2>Conclusion</h2><p>Remote team management is an ongoing process that requires adaptation and continuous improvement. By focusing on communication, trust, and results, teams can thrive in a distributed environment.</p>`,
    status: "published",
    category: "Business",
    tags: ["Remote Work", "Management", "Leadership"],
    thumbnail_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
    created_at: "2024-01-15T09:00:00Z",
    updated_at: "2024-01-16T14:30:00Z",
    published_at: "2024-01-16T14:30:00Z",
    word_count: 1850,
    reading_time: "8 min read",
    seo_score: 92,
    has_featured_image: true,
    has_meta_description: true,
    meta_description: "Learn proven strategies for managing remote teams effectively in 2024, including communication tools, performance tracking, and culture building.",
    warnings: []
  },
  "2": {
    id: "2",
    title: "Building Scalable React Applications: Architecture Patterns",
    excerpt: "Learn how to structure large React applications with proven architectural patterns, state management strategies, and performance optimization techniques.",
    content: `<h2>Introduction to React Architecture</h2><p>As React applications grow in complexity, having a solid architectural foundation becomes crucial for maintainability and scalability.</p><h2>Component Architecture</h2><p>The key to scalable React applications lies in well-designed component hierarchies and clear separation of concerns.</p><h3>Container vs Presentational Components</h3><p>This pattern helps separate business logic from presentation logic, making components more reusable and testable.</p><h2>State Management</h2><p>Choosing the right state management solution depends on your application's complexity and requirements.</p><h3>Local State vs Global State</h3><p>Understanding when to use local component state versus global state management tools like Redux or Zustand is crucial.</p><h2>Performance Optimization</h2><p>React provides several built-in optimization techniques that can significantly improve application performance.</p><h3>Memoization</h3><p>Using React.memo, useMemo, and useCallback effectively can prevent unnecessary re-renders.</p><h2>Code Organization</h2><p>A well-organized codebase is essential for team collaboration and long-term maintenance.</p>`,
    status: "published",
    category: "Technology",
    tags: ["React", "JavaScript", "Architecture"],
    thumbnail_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    created_at: "2024-02-03T11:15:00Z",
    updated_at: "2024-02-05T16:45:00Z",
    published_at: "2024-02-05T16:45:00Z",
    word_count: 2100,
    reading_time: "9 min read",
    seo_score: 88,
    has_featured_image: true,
    has_meta_description: true,
    meta_description: "Master React application architecture with proven patterns for building scalable, maintainable applications.",
    warnings: []
  },
  "3": {
    id: "3",
    title: "Sustainable Living: 10 Simple Changes for a Greener Lifestyle",
    excerpt: "Small changes can make a big impact. Discover practical ways to reduce your environmental footprint without compromising your quality of life.",
    content: `<h2>Getting Started with Sustainable Living</h2><p>Sustainable living doesn't require drastic lifestyle changes. Small, consistent actions can make a significant environmental impact.</p><h2>Energy Conservation</h2><p>Simple changes in how we use energy at home can reduce both our carbon footprint and utility bills.</p><h2>Waste Reduction</h2><p>The three R's - Reduce, Reuse, Recycle - form the foundation of waste management.</p>`,
    status: "draft",
    category: "Lifestyle",
    tags: ["Sustainability", "Environment", "Green Living"],
    thumbnail_url: "",
    created_at: "2024-02-20T13:30:00Z",
    updated_at: "2024-02-22T10:15:00Z",
    word_count: 450,
    reading_time: "2 min read",
    seo_score: 45,
    has_featured_image: false,
    has_meta_description: false,
    meta_description: "",
    warnings: ["Low word count", "Missing featured image", "Missing meta description"]
  }
}

const categories = ["Technology", "Business", "Lifestyle", "Design", "Finance", "Healthcare", "Productivity", "Marketing", "Career", "Health"]

function EditBlogContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [content, setContent] = useState("")
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [postId, setPostId] = useState<string>("")
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    tags: "",
    status: "draft",
    meta_description: "",
    thumbnail_url: ""
  })
  const { toast } = useToast()

  // Get post ID from URL params
  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      setPostId(id)
    }
  }, [searchParams])

  // Load post data
  useEffect(() => {
    if (postId && mockPosts[postId as keyof typeof mockPosts]) {
      const post = mockPosts[postId as keyof typeof mockPosts]
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags.join(", "),
        status: post.status,
        meta_description: post.meta_description || "",
        thumbnail_url: post.thumbnail_url || ""
      })
      setContent(post.content)
      setThumbnail(post.thumbnail_url || null)
    }
  }, [postId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement blog update with backend API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      toast({
        title: "Success!",
        description: "Your blog post has been updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    try {
      // TODO: Implement draft save with backend API
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      
      toast({
        title: "Draft saved!",
        description: "Your changes have been saved as a draft.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return
    }

    try {
      // TODO: Implement post deletion with backend API
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      
      toast({
        title: "Post deleted",
        description: "The blog post has been permanently deleted.",
      })
      
      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnail(reader.result as string)
        setFormData(prev => ({ ...prev, thumbnail_url: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const currentPost = postId ? mockPosts[postId as keyof typeof mockPosts] : null
  
  if (!postId) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">No Post Selected</h1>
            <p className="text-muted-foreground mb-6">Please select a post to edit from the dashboard.</p>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Edit Blog Post</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Created {new Date(currentPost.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Updated {new Date(currentPost.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/posts/${currentPost.id}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Link>
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          {/* Warnings */}
          {currentPost.warnings.length > 0 && (
            <Card className="p-4 mb-6 border-orange-200 bg-orange-50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-orange-800 mb-2">Content Issues Detected</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentPost.warnings.map((warning, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {warning}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter your blog title"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="Enter tags separated by commas"
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple tags with commas (e.g., React, JavaScript, Web Development)
                </p>
              </div>

              {/* Thumbnail */}
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Featured Image</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      disabled={isLoading}
                    />
                  </div>
                  {thumbnail && (
                    <div className="relative w-20 h-20">
                      <img
                        src={thumbnail}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  placeholder="Write a brief summary of your blog post"
                  className="h-24"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => handleInputChange("meta_description", e.target.value)}
                  placeholder="Write a meta description for search engines (150-160 characters)"
                  className="h-20"
                  disabled={isLoading}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.meta_description.length}/160 characters
                </p>
              </div>

              {/* Content Editor */}
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button variant="outline" type="button" disabled={isLoading} asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Post"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function EditBlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditBlogContent />
    </Suspense>
  )
}