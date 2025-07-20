import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Clock, Heart, MessageSquare, TrendingUp, Star } from "lucide-react"
import Link from "next/link"

// Dummy data for demonstration
const dummyPosts = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt: "Explore the cutting-edge technologies and methodologies that are shaping the future of web development, from AI-powered tools to new frameworks.",
    slug: "future-web-development-2025",
    published_at: "2024-03-10T10:00:00Z",
    reading_time: "8 min read",
    likes: 142,
    comments: 23,
    views: 1847,
    featured: true,
    category: "Technology",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    users: {
      username: "alexdev",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      full_name: "Alex Johnson"
    }
  },
  {
    id: "2",
    title: "Building Scalable React Applications: Best Practices",
    excerpt: "Learn how to structure and optimize React applications for scale, including state management, component architecture, and performance optimization.",
    slug: "scalable-react-applications",
    published_at: "2024-03-09T14:30:00Z",
    reading_time: "12 min read",
    likes: 89,
    comments: 15,
    views: 923,
    featured: false,
    category: "React",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    users: {
      username: "sarahcode",
      avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      full_name: "Sarah Chen"
    }
  },
  {
    id: "3",
    title: "The Art of Technical Writing: Communicating Complex Ideas",
    excerpt: "Master the skills needed to write clear, engaging technical documentation that helps developers understand and implement complex concepts.",
    slug: "art-technical-writing",
    published_at: "2024-03-08T09:15:00Z",
    reading_time: "6 min read",
    likes: 67,
    comments: 8,
    views: 654,
    featured: false,
    category: "Writing",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
    users: {
      username: "mikewrites",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      full_name: "Mike Rodriguez"
    }
  },
  {
    id: "4",
    title: "Database Design Patterns for Modern Applications",
    excerpt: "Explore proven database design patterns and learn when to apply them in your applications for optimal performance and maintainability.",
    slug: "database-design-patterns",
    published_at: "2024-03-07T16:45:00Z",
    reading_time: "10 min read",
    likes: 156,
    comments: 31,
    views: 2103,
    featured: true,
    category: "Database",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    users: {
      username: "dbexpert",
      avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
      full_name: "David Kim"
    }
  },
  {
    id: "5",
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "A comprehensive guide to understanding the differences between CSS Grid and Flexbox, with practical examples and use cases.",
    slug: "css-grid-vs-flexbox",
    published_at: "2024-03-06T11:20:00Z",
    reading_time: "7 min read",
    likes: 94,
    comments: 12,
    views: 1245,
    featured: false,
    category: "CSS",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    users: {
      username: "cssmaven",
      avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      full_name: "Emma Wilson"
    }
  },
  {
    id: "6",
    title: "Introduction to Machine Learning for Web Developers",
    excerpt: "Discover how web developers can leverage machine learning in their applications, from simple APIs to building custom models.",
    slug: "ml-for-web-developers",
    published_at: "2024-03-05T13:10:00Z",
    reading_time: "15 min read",
    likes: 203,
    comments: 45,
    views: 3421,
    featured: true,
    category: "AI/ML",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    users: {
      username: "aidev",
      avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face",
      full_name: "James Park"
    }
  }
]

const categories = ["All", "Technology", "React", "Writing", "Database", "CSS", "AI/ML"]

export default function ExplorePage() {
  const featuredPosts = dummyPosts.filter(post => post.featured)
  const regularPosts = dummyPosts.filter(post => !post.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Explore Posts</h1>
            <p className="text-muted-foreground">Discover amazing content from our community of writers</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Input 
              placeholder="Search posts..." 
              className="max-w-sm"
            />
            <Select defaultValue="recent">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="discussed">Most Discussed</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={category === "All" ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-yellow-500" />
              <h2 className="text-2xl font-semibold">Featured Posts</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {featuredPosts.map((post) => (
                <Link href={`/posts/${post.slug}`} key={post.id}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-500 text-yellow-50 hover:bg-yellow-600">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={post.users.avatar_url} alt={post.users.full_name} />
                          <AvatarFallback>{post.users.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{post.users.full_name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <time dateTime={post.published_at}>
                              {formatDate(post.published_at)}
                            </time>
                            <span>•</span>
                            <span>{post.reading_time}</span>
                          </div>
                        </div>
                      </div>
                      
                      <h2 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1 hover:text-red-500 transition-colors">
                            <Heart className="h-4 w-4" />
                            {formatNumber(post.likes)}
                          </span>
                          <span className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                            {post.comments}
                          </span>
                          <span className="flex items-center gap-1 hover:text-green-500 transition-colors">
                            <BookOpen className="h-4 w-4" />
                            {formatNumber(post.views)}
                          </span>
                        </div>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.id}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.users.avatar_url} alt={post.users.full_name} />
                      <AvatarFallback>{post.users.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{post.users.full_name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <time dateTime={post.published_at}>
                          {formatDate(post.published_at)}
                        </time>
                        <span>•</span>
                        <span>{post.reading_time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        {formatNumber(post.likes)}
                      </span>
                      <span className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1 hover:text-green-500 transition-colors">
                        <BookOpen className="h-4 w-4" />
                        {formatNumber(post.views)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  )
}