"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Edit2, 
  Plus, 
  Trash2, 
  Eye, 
  MessageSquare, 
  Heart, 
  TrendingUp, 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  MoreHorizontal,
  Image as ImageIcon,
  FileText,
  BarChart3
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import PostDropdownMenu from "@/components/post-dropdown-menu"

type BlogPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  status: "PUBLISHED" | "DRAFT" | "PRIVATE"
  visibility: string
  published_at?: string
  cover_image_url?: string
  author_username: string
  tags: string[]
  categories: string[]
  read_time_minutes: number
  view_count: number
  warnings?: string[]
}

/* // Realistic blog posts data
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Complete Guide to Remote Team Management in 2024",
    excerpt: "Discover proven strategies for managing distributed teams, from communication tools to performance tracking and team culture building.",
    status: "published",
    created_at: "2024-01-15T09:00:00Z",
    updated_at: "2024-01-16T14:30:00Z",
    published_at: "2024-01-16T14:30:00Z",
    thumbnail_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    },
    category: "Business",
    tags: ["Remote Work", "Management", "Leadership"],
    word_count: 1850,
    reading_time: "8 min read",
    views: 3247,
    likes: 89,
    comments: 23,
    seo_score: 92,
    has_featured_image: true,
    has_meta_description: true,
    warnings: [],
    slug: "remote-team-management-2024"
  },
  {
    id: "2",
    title: "Building Scalable React Applications: Architecture Patterns",
    excerpt: "Learn how to structure large React applications with proven architectural patterns, state management strategies, and performance optimization techniques.",
    status: "published",
    created_at: "2024-02-03T11:15:00Z",
    updated_at: "2024-02-05T16:45:00Z",
    published_at: "2024-02-05T16:45:00Z",
    thumbnail_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    author: {
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    category: "Technology",
    tags: ["React", "JavaScript", "Architecture"],
    word_count: 2100,
    reading_time: "9 min read",
    views: 5621,
    likes: 156,
    comments: 34,
    seo_score: 88,
    has_featured_image: true,
    has_meta_description: true,
    warnings: [],
    slug: "scalable-react-applications"
  },
  {
    id: "3",
    title: "Sustainable Living: 10 Simple Changes for a Greener Lifestyle",
    excerpt: "Small changes can make a big impact. Discover practical ways to reduce your environmental footprint without compromising your quality of life.",
    status: "draft",
    created_at: "2024-02-20T13:30:00Z",
    updated_at: "2024-02-22T10:15:00Z",
    author: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    category: "Lifestyle",
    tags: ["Sustainability", "Environment", "Green Living"],
    word_count: 450,
    reading_time: "2 min read",
    views: 0,
    likes: 0,
    comments: 0,
    seo_score: 45,
    has_featured_image: false,
    has_meta_description: false,
    warnings: ["Low word count", "Missing featured image", "Missing meta description"],
    slug: "sustainable-living-simple-changes"
  },
  {
    id: "4",
    title: "The Psychology of User Experience: Understanding User Behavior",
    excerpt: "Dive deep into the psychological principles that drive user behavior and learn how to apply them to create more intuitive and engaging digital experiences.",
    status: "published",
    created_at: "2024-01-28T08:45:00Z",
    updated_at: "2024-01-30T12:20:00Z",
    published_at: "2024-01-30T12:20:00Z",
    thumbnail_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    author: {
      name: "Dr. Michael Park",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    category: "Design",
    tags: ["UX", "Psychology", "Design"],
    word_count: 1920,
    reading_time: "8 min read",
    views: 2834,
    likes: 127,
    comments: 18,
    seo_score: 94,
    has_featured_image: true,
    has_meta_description: true,
    warnings: [],
    slug: "psychology-user-experience"
  },
  {
    id: "5",
    title: "Cryptocurrency Investment Strategies for Beginners",
    excerpt: "Navigate the complex world of cryptocurrency investing with this comprehensive guide covering risk management, portfolio diversification, and market analysis.",
    status: "draft",
    created_at: "2024-03-01T15:20:00Z",
    updated_at: "2024-03-05T09:30:00Z",
    thumbnail_url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=200&fit=crop",
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face"
    },
    category: "Finance",
    tags: ["Cryptocurrency", "Investment", "Finance"],
    word_count: 1650,
    reading_time: "7 min read",
    views: 0,
    likes: 0,
    comments: 0,
    seo_score: 72,
    has_featured_image: true,
    has_meta_description: false,
    warnings: ["Missing meta description"],
    slug: "cryptocurrency-investment-strategies"
  },
  {
    id: "6",
    title: "The Future of Artificial Intelligence in Healthcare",
    excerpt: "Explore how AI is revolutionizing healthcare delivery, from diagnostic imaging to personalized treatment plans and drug discovery.",
    status: "published",
    created_at: "2024-02-10T10:00:00Z",
    updated_at: "2024-02-12T14:15:00Z",
    published_at: "2024-02-12T14:15:00Z",
    thumbnail_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    author: {
      name: "Dr. Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1594824388853-2c5899d87b29?w=40&h=40&fit=crop&crop=face"
    },
    category: "Healthcare",
    tags: ["AI", "Healthcare", "Technology"],
    word_count: 2250,
    reading_time: "10 min read",
    views: 4567,
    likes: 203,
    comments: 45,
    seo_score: 96,
    has_featured_image: true,
    has_meta_description: true,
    warnings: [],
    slug: "ai-healthcare-future"
  },
  {
    id: "7",
    title: "Mastering Time Management: Productivity Techniques That Actually Work",
    excerpt: "Cut through the productivity noise and discover evidence-based time management techniques that will transform your daily workflow.",
    status: "private",
    created_at: "2024-02-25T16:30:00Z",
    updated_at: "2024-02-26T11:45:00Z",
    thumbnail_url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=200&fit=crop",
    author: {
      name: "James Miller",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face"
    },
    category: "Productivity",
    tags: ["Time Management", "Productivity", "Workflow"],
    word_count: 1780,
    reading_time: "8 min read",
    views: 0,
    likes: 0,
    comments: 0,
    seo_score: 85,
    has_featured_image: true,
    has_meta_description: true,
    warnings: [],
    slug: "time-management-productivity"
  },
  {
    id: "8",
    title: "Database Optimization Techniques for High-Performance Applications",
    excerpt: "Learn advanced database optimization strategies including indexing, query optimization, and scaling techniques for modern applications.",
    status: "published",
    created_at: "2024-01-20T12:00:00Z",
    updated_at: "2024-01-22T15:30:00Z",
    published_at: "2024-01-22T15:30:00Z",
    thumbnail_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
    author: {
      name: "Rachel Green",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face"
    },
    category: "Technology",
    tags: ["Database", "Performance", "Optimization"],
    word_count: 1950,
    reading_time: "9 min read",
    views: 2156,
    likes: 78,
    comments: 12,
    seo_score: 89,
    has_featured_image: true,
    has_meta_description: true,
    warnings: [],
    slug: "database-optimization-techniques"
  },
  {
    id: "9",
    title: "Content Marketing Trends",
    excerpt: "Stay ahead of the curve with the latest content marketing trends and strategies that are driving engagement in 2024.",
    status: "draft",
    created_at: "2024-03-08T14:20:00Z",
    updated_at: "2024-03-08T14:20:00Z",
    author: {
      name: "Tom Anderson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    category: "Marketing",
    tags: ["Content Marketing", "Digital Marketing"],
    word_count: 320,
    reading_time: "1 min read",
    views: 0,
    likes: 0,
    comments: 0,
    seo_score: 35,
    has_featured_image: false,
    has_meta_description: false,
    warnings: ["Low word count", "Missing featured image", "Missing meta description", "Incomplete title"],
    slug: "content-marketing-trends"
  },
  {
    id: "10",
    title: "Building a Personal Brand: A Complete Guide for Professionals",
    excerpt: "Learn how to build and maintain a strong personal brand that opens doors to new opportunities and establishes you as a thought leader in your industry.",
    status: "published",
    created_at: "2024-02-14T09:15:00Z",
    updated_at: "2024-02-16T13:45:00Z",
    published_at: "2024-02-16T13:45:00Z",
    thumbnail_url: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=200&fit=crop",
    author: {
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face"
    },
    category: "Career",
    tags: ["Personal Branding", "Career", "Professional Development"],
    word_count: 2050,
    reading_time: "9 min read",
    views: 3891,
    likes: 142,
    comments: 28,
    seo_score: 91,
    has_featured_image: true,
    has_meta_description: true,
    warnings: [],
    slug: "personal-brand-guide"
  },
  {
    id: "11",
    title: "The Science of Sleep: Optimizing Your Rest for Peak Performance",
    excerpt: "Discover the latest research on sleep science and learn practical strategies to improve your sleep quality for better health and productivity.",
    status: "draft",
    created_at: "2024-03-10T11:30:00Z",
    updated_at: "2024-03-12T16:20:00Z",
    author: {
      name: "Dr. Kevin Lee",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face"
    },
    category: "Health",
    tags: ["Sleep", "Health", "Wellness"],
    word_count: 1420,
    reading_time: "6 min read",
    views: 0,
    likes: 0,
    comments: 0,
    seo_score: 78,
    has_featured_image: false,
    has_meta_description: true,
    warnings: ["Missing featured image"],
    slug: "science-of-sleep"
  },
  {
    id: "12",
    title: "Sustainable Business Practices: Profit with Purpose",
    excerpt: "Learn how companies are integrating sustainability into their business models while maintaining profitability and competitive advantage.",
    status: "published",
    created_at: "2024-01-25T13:45:00Z",
    updated_at: "2024-01-27T10:30:00Z",
    published_at: "2024-01-27T10:30:00Z",
    thumbnail_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop",
    author: {
      name: "Jennifer Walsh",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    },
    category: "Business",
    tags: ["Sustainability", "Business Strategy", "ESG"],
    word_count: 1890,
    reading_time: "8 min read",
    views: 2743,
    likes: 95,
    comments: 16,
    seo_score: 87,
    has_featured_image: true,
    has_meta_description: true,
    warnings: [],
    slug: "sustainable-business-practices"
  }
] */
const blogPosts: BlogPost[] = []

export default function DashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("updated")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts")
        if (!response.ok) throw new Error(`Failed to fetch posts: ${response.status}`)
        const data = await response.json()
        // Handle both plain array and paginated { content: [] } responses
        setPosts(Array.isArray(data) ? data : (data.content ?? []))
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "DRAFT":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "PRIVATE":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId))
  }

  const handleArchivePost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, status: "PRIVATE" as const }
        : post
    ))
  }

  const handleDuplicatePost = (postId: number) => {
    const postToDuplicate = posts.find(post => post.id === postId)
    if (postToDuplicate) {
      const newPost: BlogPost = {
        ...postToDuplicate,
        id: Date.now(),
        title: `${postToDuplicate.title} (Copy)`,
        status: "DRAFT",
        published_at: undefined,
        view_count: 0,
        slug: `${postToDuplicate.slug}-copy`
      }
      setPosts([newPost, ...posts])
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    const matchesCategory = categoryFilter === "all" || post.categories.includes(categoryFilter)
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title)
      case "views":
        return b.view_count - a.view_count
      case "created":
      case "updated":
      default:
        return new Date(b.published_at ?? "").getTime() - new Date(a.published_at ?? "").getTime()
    }
  })

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === "PUBLISHED").length,
    drafts: posts.filter(p => p.status === "DRAFT").length,
    private: posts.filter(p => p.status === "PRIVATE").length,
    totalViews: posts.reduce((sum, p) => sum + p.view_count, 0),
    postsWithWarnings: posts.filter(p => (p.warnings?.length ?? 0) > 0).length
  }

  const categories = [...new Set(posts.flatMap(p => p.categories))]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Content Dashboard</h1>
            <p className="text-muted-foreground">Manage your blog posts and track performance</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/create">
              <Plus className="w-4 h-4 mr-2" />
              Create New Post
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Total Posts</span>
            </div>
            <p className="text-2xl font-bold">{stats.total}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Published</span>
            </div>
            <p className="text-2xl font-bold text-green-500">{stats.published}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Edit2 className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Drafts</span>
            </div>
            <p className="text-2xl font-bold text-yellow-500">{stats.drafts}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Total Views</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Warnings</span>
            </div>
            <p className="text-2xl font-bold text-orange-500">{stats.postsWithWarnings}</p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PRIVATE">Private</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Last Updated</SelectItem>
                <SelectItem value="created">Date Created</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="views">Views</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading ? (
            <Card className="col-span-full p-8 text-center">
              <p className="text-muted-foreground">Loading posts...</p>
            </Card>
          ) : sortedPosts.length === 0 ? (
            <Card className="col-span-full p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">No posts found</h2>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" || categoryFilter !== "all" 
                  ? "Try adjusting your filters or search terms."
                  : "Start creating your first blog post today!"
                }
              </p>
              <Button asChild>
                <Link href="/dashboard/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Post
                </Link>
              </Button>
            </Card>
          ) : (
            sortedPosts.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted">
                  {post.cover_image_url ? (
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge className={getStatusColor(post.status)}>
                      {post.status.toLowerCase()}
                    </Badge>
                  </div>
                  {(post.warnings?.length ?? 0) > 0 && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {post.warnings!.length}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category and Author */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{post.categories[0]}</Badge>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{post.author_username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{post.author_username}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold line-clamp-2 mb-2 flex-shrink-0">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Warnings */}
                  {(post.warnings?.length ?? 0) > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {post.warnings!.slice(0, 2).map((warning, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {warning}
                          </Badge>
                        ))}
                        {post.warnings!.length > 2 && (
                          <Badge variant="destructive" className="text-xs">
                            +{post.warnings!.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.read_time_minutes} min read
                      </span>
                    </div>

                    {post.status === "PUBLISHED" && (
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.view_count.toLocaleString()} views
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t">
                    <div className="text-xs text-muted-foreground">
                      {post.published_at && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Published {formatDate(post.published_at)}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/edit?id=${post.id}`}>
                          <Edit2 className="w-3 h-3" />
                        </Link>
                      </Button>
                      <PostDropdownMenu
                        postId={String(post.id)}
                        postTitle={post.title}
                        postStatus={post.status}
                        postSlug={post.slug}
                        onDelete={() => handleDeletePost(post.id)}
                        onArchive={() => handleArchivePost(post.id)}
                        onDuplicate={() => handleDuplicatePost(post.id)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {sortedPosts.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Showing {sortedPosts.length} of {posts.length} posts
            </p>
          </div>
        )}
      </div>
    </div>
  )
}