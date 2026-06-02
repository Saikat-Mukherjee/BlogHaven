"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Calendar, Eye, ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"
import PostInteractions from "@/components/post-interactions"
import CommentsSection from "@/components/comments-section"
import { useState, useEffect, use } from "react"

type Post = {
  id: number
  slug: string
  title: string
  content: string
  excerpt: string
  cover_image_url?: string
  author_username: string
  tags: string[]
  categories: string[]
  status: string
  visibility: string
  read_time_minutes: number
  view_count: number
  created_at?: string
  updated_at?: string
  published_at?: string
}

/* // Generate static params for static export
export async function generateStaticParams() {
  // Return a list of possible slug values for static generation
  // Include all post IDs that might be referenced
  return [
    { slug: 'future-web-development-2025' },
    { slug: 'scalable-react-applications' },
    { slug: 'art-technical-writing' },
    { slug: 'database-design-patterns' },
    { slug: 'css-grid-vs-flexbox' },
    { slug: 'ml-for-web-developers' },
    { slug: '1' }, // Include numeric IDs as well
    { slug: '2' },
    { slug: '3' },
    { slug: '4' },
    { slug: '5' },
    { slug: '6' },
    { slug: '7' },
    { slug: '8' },
    { slug: '9' },
    { slug: '10' },
    { slug: '11' },
    { slug: '12' }
  ]
} */

// Mock data for different posts based on slug/id
/* const getPostData = (slug: string) => {
  // Handle both slug-based and ID-based routing
  const postDataMap: { [key: string]: any } = {
    'future-web-development-2025': {
      id: "1",
      title: "The Future of Web Development: Trends to Watch in 2025",
      content: `
        <div class="prose prose-lg max-w-none">
          <p>The web development landscape is evolving at an unprecedented pace. As we move into 2025, several key trends are emerging that will fundamentally reshape how we build and interact with web applications.</p>
          
          <h2>1. AI-Powered Development Tools</h2>
          <p>Artificial Intelligence is no longer just a buzzword in web development. AI-powered tools are becoming integral to the development process, from code generation to automated testing and deployment.</p>
          
          <blockquote>
            <p>"The future of web development lies in the seamless integration of AI tools that enhance developer productivity while maintaining code quality." - Tech Industry Expert</p>
          </blockquote>
          
          <h2>2. WebAssembly (WASM) Adoption</h2>
          <p>WebAssembly is gaining significant traction, allowing developers to run high-performance applications in the browser. This technology is particularly valuable for:</p>
          <ul>
            <li>Complex computational tasks</li>
            <li>Gaming applications</li>
            <li>Image and video processing</li>
            <li>Scientific simulations</li>
          </ul>
          
          <h2>3. Edge Computing and CDN Evolution</h2>
          <p>The rise of edge computing is bringing computation closer to users, resulting in faster load times and improved user experiences. Modern CDNs are evolving beyond simple content delivery to become powerful computing platforms.</p>
          
          <h2>4. Progressive Web Apps (PWAs) 2.0</h2>
          <p>PWAs are entering a new phase with enhanced capabilities including:</p>
          <ul>
            <li>Better offline functionality</li>
            <li>Improved native app integration</li>
            <li>Enhanced performance metrics</li>
            <li>Advanced caching strategies</li>
          </ul>
          
          <h2>Conclusion</h2>
          <p>The future of web development is bright and full of exciting possibilities. By staying informed about these trends and continuously learning, developers can build more efficient, powerful, and user-friendly web applications.</p>
        </div>
      `,
      excerpt: "Explore the cutting-edge technologies and methodologies that are shaping the future of web development, from AI-powered tools to new frameworks.",
      slug: "future-web-development-2025",
      published_at: "2024-03-10T10:00:00Z",
      reading_time: "8 min read",
      likes: 142,
      comments: 23,
      views: 1847,
      bookmarks: 67,
      shares: 34,
      category: "Technology",
      tags: ["Web Development", "AI", "WebAssembly", "PWA", "Edge Computing"],
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
      author: {
        id: "author1",
        username: "alexdev",
        avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
        full_name: "Alex Johnson",
        bio: "Senior Full-Stack Developer with 8+ years of experience in modern web technologies. Passionate about AI and emerging tech trends.",
        followers: 1247,
        posts: 89
      }
    },
    '1': {
      id: "1",
      title: "The Complete Guide to Remote Team Management in 2024",
      content: `
        <div class="prose prose-lg max-w-none">
          <p>Remote work has become the new normal for many organizations worldwide. As we navigate through 2024, the challenges and opportunities of managing distributed teams continue to evolve.</p>
          
          <h2>Key Strategies</h2>
          <p>Effective remote team management requires a combination of the right tools, clear communication protocols, and a strong company culture that transcends physical boundaries.</p>
          
          <h3>Communication Tools</h3>
          <p>The foundation of successful remote teams lies in robust communication infrastructure. Tools like Slack, Microsoft Teams, and Zoom have become essential, but it's not just about having the tools—it's about using them effectively.</p>
          
          <h3>Performance Tracking</h3>
          <p>Traditional performance metrics may not apply to remote work. Focus on outcomes rather than hours worked, and establish clear KPIs that align with business objectives.</p>
          
          <h2>Building Team Culture</h2>
          <p>Creating a strong team culture remotely requires intentional effort. Regular virtual team building activities, clear values communication, and fostering informal interactions are crucial.</p>
          
          <h2>Conclusion</h2>
          <p>Remote team management is an ongoing process that requires adaptation and continuous improvement. By focusing on communication, trust, and results, teams can thrive in a distributed environment.</p>
        </div>
      `,
      excerpt: "Discover proven strategies for managing distributed teams, from communication tools to performance tracking and team culture building.",
      slug: "remote-team-management-2024",
      published_at: "2024-01-15T09:00:00Z",
      reading_time: "8 min read",
      likes: 89,
      comments: 15,
      views: 1247,
      bookmarks: 34,
      shares: 12,
      category: "Business",
      tags: ["Remote Work", "Management", "Leadership", "Team Building"],
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop",
      author: {
        id: "author2",
        username: "sarahmanager",
        avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
        full_name: "Sarah Chen",
        bio: "Team Lead and Remote Work Advocate with 10+ years of experience managing distributed teams across multiple time zones.",
        followers: 892,
        posts: 45
      }
    },
    '2': {
      id: "2",
      title: "Building Scalable React Applications: Architecture Patterns",
      content: `
        <div class="prose prose-lg max-w-none">
          <p>As React applications grow in complexity, having a solid architectural foundation becomes crucial for maintainability and scalability.</p>
          
          <h2>Component Architecture</h2>
          <p>The key to scalable React applications lies in well-designed component hierarchies and clear separation of concerns.</p>
          
          <h3>Container vs Presentational Components</h3>
          <p>This pattern helps separate business logic from presentation logic, making components more reusable and testable.</p>
          
          <h2>State Management</h2>
          <p>Choosing the right state management solution depends on your application's complexity and requirements.</p>
          
          <h3>Local State vs Global State</h3>
          <p>Understanding when to use local component state versus global state management tools like Redux or Zustand is crucial.</p>
          
          <h2>Performance Optimization</h2>
          <p>React provides several built-in optimization techniques that can significantly improve application performance.</p>
          
          <h3>Memoization</h3>
          <p>Using React.memo, useMemo, and useCallback effectively can prevent unnecessary re-renders.</p>
          
          <h2>Code Organization</h2>
          <p>A well-organized codebase is essential for team collaboration and long-term maintenance.</p>
        </div>
      `,
      excerpt: "Learn how to structure large React applications with proven architectural patterns, state management strategies, and performance optimization techniques.",
      slug: "scalable-react-applications",
      published_at: "2024-02-03T11:15:00Z",
      reading_time: "12 min read",
      likes: 156,
      comments: 31,
      views: 2103,
      bookmarks: 78,
      shares: 23,
      category: "Technology",
      tags: ["React", "JavaScript", "Architecture", "Performance"],
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
      author: {
        id: "author3",
        username: "reactdev",
        avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
        full_name: "Mike Rodriguez",
        bio: "React specialist and frontend architect with expertise in building large-scale applications for enterprise clients.",
        followers: 1534,
        posts: 67
      }
    },
    '3': {
      id: "3",
      title: "Sustainable Living: 10 Simple Changes for a Greener Lifestyle",
      content: `
        <div class="prose prose-lg max-w-none">
          <p>Sustainable living doesn't require drastic lifestyle changes. Small, consistent actions can make a significant environmental impact.</p>
          
          <h2>Energy Conservation</h2>
          <p>Simple changes in how we use energy at home can reduce both our carbon footprint and utility bills.</p>
          
          <h3>Smart Home Technology</h3>
          <p>Investing in smart thermostats, LED lighting, and energy-efficient appliances can significantly reduce energy consumption.</p>
          
          <h2>Waste Reduction</h2>
          <p>The three R's - Reduce, Reuse, Recycle - form the foundation of waste management.</p>
          
          <h3>Composting</h3>
          <p>Starting a home composting system can reduce kitchen waste by up to 30% while creating nutrient-rich soil for gardening.</p>
          
          <h2>Sustainable Transportation</h2>
          <p>Consider walking, cycling, or using public transportation for short trips. For longer distances, carpooling or electric vehicles are great alternatives.</p>
          
          <h2>Conscious Consumption</h2>
          <p>Before making purchases, ask yourself: Do I really need this? Can I buy it second-hand? Is there a more sustainable alternative?</p>
          
          <h2>Water Conservation</h2>
          <p>Simple changes like fixing leaks, taking shorter showers, and collecting rainwater can make a significant difference.</p>
        </div>
      `,
      excerpt: "Small changes can make a big impact. Discover practical ways to reduce your environmental footprint without compromising your quality of life.",
      slug: "sustainable-living-simple-changes",
      published_at: "2024-02-20T13:30:00Z",
      reading_time: "6 min read",
      likes: 67,
      comments: 12,
      views: 854,
      bookmarks: 23,
      shares: 8,
      category: "Lifestyle",
      tags: ["Sustainability", "Environment", "Green Living", "Eco-Friendly"],
      thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop",
      author: {
        id: "author4",
        username: "ecowarrior",
        avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
        full_name: "Emma Wilson",
        bio: "Environmental advocate and sustainability consultant helping individuals and businesses reduce their environmental impact.",
        followers: 623,
        posts: 34
      }
    }
  }

  // Return the post data or a default post if not found
  return postDataMap[slug] || postDataMap['1']
} */

// Dummy comments data
/* const commentsData = [
  {
    id: "1",
    content: "Excellent article! The section on WebAssembly particularly caught my attention. I've been experimenting with WASM for image processing and the performance gains are remarkable.",
    created_at: "2024-03-10T14:30:00Z",
    likes: 12,
    replies: 2,
    user: {
      username: "devmike",
      full_name: "Mike Chen",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    replies_data: [
      {
        id: "1-1",
        content: "I agree! Have you tried using WASM with Rust? The toolchain has improved significantly.",
        created_at: "2024-03-10T15:45:00Z",
        likes: 3,
        replies: 0,
        user: {
          username: "rustdev",
          full_name: "Sarah Kim",
          avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
        }
      }
    ]
  },
  {
    id: "2",
    content: "Great insights on edge computing! I'm curious about the security implications of running code closer to users. Any thoughts on best practices?",
    created_at: "2024-03-10T16:20:00Z",
    likes: 8,
    replies: 1,
    user: {
      username: "securitypro",
      full_name: "David Rodriguez",
      avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face"
    },
    replies_data: []
  },
  {
    id: "3",
    content: "The AI-powered development tools section is spot on. I've been using GitHub Copilot and it's incredible how much it speeds up development while maintaining code quality.",
    created_at: "2024-03-10T18:10:00Z",
    likes: 15,
    replies: 0,
    user: {
      username: "aidev",
      full_name: "Emma Wilson",
      avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    replies_data: []
  }
] */

export default function PostDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`)
        if (!response.ok) {
          setError(response.status === 404 ? "Post not found." : "Failed to load post.")
          return
        }
        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError("Failed to load post.")
        console.error("Error fetching post:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading post...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{error ?? "Post not found."}</p>
          <Button asChild><Link href="/explore">Back to Explore</Link></Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/explore" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Explore
              </Link>
            </Button>
            <PostInteractions
              postId={String(post.id)}
              initialBookmarked={false}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {post.categories.map((cat) => (
                <Badge key={cat} variant="secondary">{cat}</Badge>
              ))}
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{post.author_username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{post.author_username}</h3>
                    <Button variant="outline" size="sm">Follow</Button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {post.published_at && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.published_at)}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.read_time_minutes} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.view_count.toLocaleString()} views
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            {post.cover_image_url ? (
              <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="relative aspect-video mb-8 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Article Content */}
          <Card className="p-8 mb-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-l-primary prose-li:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Card>

          {/* Author Card */}
          <Card className="p-6 mb-8">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>{post.author_username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{post.author_username}</h3>
                  <Button variant="outline">Follow</Button>
                </div>
                <p className="text-muted-foreground text-sm">
                  View all posts by {post.author_username}
                </p>
              </div>
            </div>
          </Card>

          {/* Comments Section */}
          <CommentsSection postSlug={post.slug} />
        </div>
      </div>
    </div>
  )
}