import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MapPin, 
  Calendar, 
  Globe, 
  Mail, 
  Phone, 
  Linkedin, 
  Twitter, 
  Github,
  Award,
  BookOpen,
  Heart,
  MessageSquare,
  Eye,
  ArrowLeft,
  Edit,
  Star,
  Briefcase,
  Languages,
  Clock,
  TrendingUp
} from "lucide-react"
import Link from "next/link"
import ProfileInteractions from "@/components/profile-interactions"
import { cookies } from "next/headers"

// ---------------------------------------------------------------------------
// Types — replace with generated API types (e.g. from OpenAPI / Prisma) when
// the backend is connected.
// ---------------------------------------------------------------------------
interface UserProfile {
  id: string
  username: string
  full_name: string
  avatar_url: string
  bio?: string
  location?: string
  timezone?: string
  website?: string
  email?: string
  phone?: string
  linkedin?: string
  twitter?: string
  github?: string
  joined_date: string
  followers: number
  following: number
  posts_count: number
  total_likes: number
  total_views: number
  experience_level?: string
  availability?: string
  work_style?: string
  professional_summary?: string
  core_skills?: string[]
  industry_focus?: { primary?: string; secondary?: string }
  achievements?: string[]
  expertise_areas?: string[]
  languages?: { native?: string; professional?: string; conversational?: string }
  interests?: string[]
  contact_preferences?: string[]
  featured_posts?: {
    id: string
    title: string
    excerpt: string
    slug: string
    published_at: string
    reading_time: string
    likes: number
    comments: number
    views: number
    category: string
    thumbnail: string
  }[]
  recent_activity?: {
    type: 'post' | 'comment' | 'like'
    title: string
    date: string
    link: string
  }[]
}

// TODO: Replace with dynamic params fetched from API or remove if using fully dynamic rendering
// export async function generateStaticParams() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
//   const users = await res.json()
//   return users.map((u: { username: string }) => ({ username: u.username }))
// }

// TODO: Remove this mock and replace with: GET /api/users/${username}/profile
// All data below is HARDCODED placeholder — not real user data
/*
const getUserProfile_MOCK = (username: string) => {
  const profiles: { [key: string]: any } = {
    'alexdev': {
      id: "1",
      username: "alexdev",
      full_name: "Alex Johnson",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      bio: "Senior Full-Stack Developer with 8+ years of experience in modern web technologies. Passionate about AI and emerging tech trends.",
      location: "San Francisco, CA",
      timezone: "PST (UTC-8)",
      website: "https://alexdev.io",
      email: "alex@alexdev.io",
      phone: "+1 (555) 123-4567",
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexdev",
      github: "https://github.com/alexdev",
      joined_date: "2022-03-15T00:00:00Z",
      followers: 1247,
      following: 89,
      posts_count: 89,
      total_likes: 3420,
      total_views: 45600,
      experience_level: "Expert (10+ years)",
      availability: "Available for consulting",
      work_style: "Remote-first, collaborative",
      professional_summary: "Innovative full-stack developer specializing in React, Node.js, and cloud architecture. I help startups and enterprises build scalable web applications that drive business growth.",
      core_skills: [
        "React & Next.js",
        "Node.js & Express",
        "TypeScript",
        "AWS & Cloud Architecture",
        "Database Design"
      ],
      industry_focus: {
        primary: "Technology",
        secondary: "Fintech"
      },
      achievements: [
        "Led development of a platform serving 100K+ users",
        "Reduced application load time by 60% through optimization",
        "Mentored 15+ junior developers across multiple teams"
      ],
      expertise_areas: [
        "Full-Stack Development",
        "System Architecture",
        "Team Leadership"
      ],
      languages: {
        native: "English",
        professional: "Spanish",
        conversational: "French"
      },
      interests: [
        "AI/Machine Learning",
        "Open Source Contributions",
        "Tech Mentoring"
      ],
      contact_preferences: ["Email", "LinkedIn"],
      featured_posts: [
        {
          id: "1",
          title: "The Future of Web Development: Trends to Watch in 2025",
          excerpt: "Explore the cutting-edge technologies and methodologies that are shaping the future of web development.",
          slug: "future-web-development-2025",
          published_at: "2024-03-10T10:00:00Z",
          reading_time: "8 min read",
          likes: 142,
          comments: 23,
          views: 1847,
          category: "Technology",
          thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"
        }
      ],
      recent_activity: [
        {
          type: "post",
          title: "Published: The Future of Web Development",
          date: "2024-03-10T10:00:00Z",
          link: "/posts/future-web-development-2025"
        },
        {
          type: "comment",
          title: "Commented on: Building Scalable React Applications",
          date: "2024-03-09T15:30:00Z",
          link: "/posts/scalable-react-applications"
        },
        {
          type: "like",
          title: "Liked: Database Design Patterns",
          date: "2024-03-08T12:15:00Z",
          link: "/posts/database-design-patterns"
        }
      ]
    },
    'sarahmanager': {
      id: "2",
      username: "sarahmanager",
      full_name: "Sarah Chen",
      avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      bio: "Team Lead and Remote Work Advocate with 10+ years of experience managing distributed teams across multiple time zones.",
      location: "Austin, TX",
      timezone: "CST (UTC-6)",
      website: "https://sarahchen.com",
      email: "sarah@sarahchen.com",
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahmanager",
      joined_date: "2021-08-20T00:00:00Z",
      followers: 892,
      following: 156,
      posts_count: 45,
      total_likes: 2180,
      total_views: 28900,
      experience_level: "Senior Level (6-10 years)",
      availability: "Open to speaking opportunities",
      work_style: "Hybrid, mentorship-focused",
      professional_summary: "Experienced team leader passionate about building high-performing remote teams. I specialize in agile methodologies and creating inclusive work environments.",
      core_skills: [
        "Team Leadership",
        "Agile/Scrum",
        "Remote Team Management",
        "Performance Coaching",
        "Strategic Planning"
      ],
      industry_focus: {
        primary: "Management",
        secondary: "HR Tech"
      },
      achievements: [
        "Scaled engineering team from 5 to 25 members",
        "Implemented remote-first culture increasing productivity by 40%",
        "Reduced team turnover by 65% through improved processes"
      ],
      expertise_areas: [
        "Team Management",
        "Remote Work Strategy",
        "Agile Coaching"
      ],
      languages: {
        native: "English",
        professional: "Mandarin",
        conversational: "Japanese"
      },
      interests: [
        "Leadership Development",
        "Diversity & Inclusion",
        "Work-Life Balance"
      ],
      contact_preferences: ["Email", "LinkedIn"],
      featured_posts: [],
      recent_activity: []
    }
  }

  return profiles[username] || profiles['alexdev']
}
*/

// Fetches profile directly from Spring Boot — called server-side where relative URLs are invalid.
const getUserProfile = async (username: string, accessToken?: string): Promise<UserProfile | null> => {
  try {
    const res = await fetch(
      `${process.env.SPRING_BOOT_API_URL}/api/profiles/${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        cache: 'no-store',
      }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

/** Decodes the access_token cookie to read the logged-in user's username. */
async function getCurrentUser(): Promise<{ username: string | null; token: string | null }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value ?? null
    if (!token) return { username: null, token: null }
    const parts = token.split('.')
    if (parts.length < 2) return { username: null, token: null }
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const pad = base64.length % 4
    if (pad === 2) base64 += '=='
    else if (pad === 3) base64 += '='
    const payload = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'))
    const username = payload.sub ?? payload.username ?? null
    return { username, token }
  } catch {
    return { username: null, token: null }
  }
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const { username: currentUsername, token } = await getCurrentUser()
  const isOwnProfile = currentUsername !== null && currentUsername === username

  const profile = await getUserProfile(username, token ?? undefined)

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Profile not found</h1>
          <p className="text-muted-foreground mb-4">The user @{username} does not exist.</p>
          <Button asChild>
            <Link href="/explore">Browse Authors</Link>
          </Button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/explore" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Explore
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                  <AvatarFallback className="text-2xl">{profile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{profile.full_name}</h1>
                  <p className="text-lg text-muted-foreground mb-4">@{profile.username}</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    {profile.experience_level && <Badge variant="secondary">{profile.experience_level}</Badge>}
                    {profile.industry_focus?.primary && <Badge variant="outline">{profile.industry_focus.primary}</Badge>}
                  </div>
                  <ProfileInteractions isOwnProfile={isOwnProfile} username={username} />
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Professional Summary</h2>
                  <p className="text-muted-foreground leading-relaxed">{profile.professional_summary}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{(profile.followers ?? 0).toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{profile.posts_count ?? 0}</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{(profile.total_likes ?? 0).toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{((profile.total_views ?? 0) / 1000).toFixed(1)}K</div>
                    <div className="text-sm text-muted-foreground">Total Views</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {profile.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {formatDate(profile.joined_date)}
                  </span>
                  {profile.website && (
                    <a href={profile.website} className="flex items-center gap-1 hover:text-primary">
                      <Globe className="h-4 w-4" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - About */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6">
                  {/* Core Skills */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Core Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(profile.core_skills ?? []).map((skill: string) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>

                  {/* Expertise Areas */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Areas of Expertise
                    </h3>
                    <div className="space-y-2">
                      {(profile.expertise_areas ?? []).map((area: string, index: number) => (
                        <div key={area} className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Languages */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Languages className="h-5 w-5" />
                      Languages
                    </h3>
                    <div className="space-y-2">
                      {profile.languages?.native && (
                        <div className="flex justify-between">
                          <span>{profile.languages.native}</span>
                          <Badge variant="outline">Native</Badge>
                        </div>
                      )}
                      {profile.languages?.professional && (
                        <div className="flex justify-between">
                          <span>{profile.languages.professional}</span>
                          <Badge variant="outline">Professional</Badge>
                        </div>
                      )}
                      {profile.languages?.conversational && (
                        <div className="flex justify-between">
                          <span>{profile.languages.conversational}</span>
                          <Badge variant="outline">Conversational</Badge>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Professional Interests */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Professional Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(profile.interests ?? []).map((interest: string) => (
                        <Badge key={interest} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="posts" className="space-y-6">
                  {(profile.featured_posts?.length ?? 0) > 0 ? (
                    profile.featured_posts!.map((post: any) => (
                      <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="flex">
                          <div className="w-48 h-32">
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{post.category}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {formatTimeAgo(post.published_at)}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                              <Link href={`/posts/${post.slug}`} className="hover:text-primary">
                                {post.title}
                              </Link>
                            </h3>
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.reading_time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                {post.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {post.comments}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {post.views}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-8 text-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                      <p className="text-muted-foreground">
                        {profile.full_name} hasn't published any posts yet.
                      </p>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  {(profile.recent_activity?.length ?? 0) > 0 ? (
                    profile.recent_activity!.map((activity: any, index: number) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            {activity.type === 'post' && <BookOpen className="h-4 w-4 text-primary" />}
                            {activity.type === 'comment' && <MessageSquare className="h-4 w-4 text-primary" />}
                            {activity.type === 'like' && <Heart className="h-4 w-4 text-primary" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatTimeAgo(activity.date)}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-8 text-center">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No recent activity</h3>
                      <p className="text-muted-foreground">
                        No recent activity to display.
                      </p>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="achievements" className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Professional Achievements
                    </h3>
                    <div className="space-y-3">
                      {(profile.achievements ?? []).map((achievement: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-0.5">
                            <Award className="h-3 w-3" />
                          </div>
                          <p className="flex-1">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {profile.email && (
                    <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm hover:text-primary">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </a>
                  )}
                  {profile.linkedin && (
                    <a href={profile.linkedin} className="flex items-center gap-3 text-sm hover:text-primary">
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {profile.twitter && (
                    <a href={profile.twitter} className="flex items-center gap-3 text-sm hover:text-primary">
                      <Twitter className="h-4 w-4" />
                      <span>Twitter</span>
                    </a>
                  )}
                  {profile.github && (
                    <a href={profile.github} className="flex items-center gap-3 text-sm hover:text-primary">
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </Card>

              {/* Work Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Work Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Availability:</span>
                    <p className="text-muted-foreground">{profile.availability}</p>
                  </div>
                  <div>
                    <span className="font-medium">Work Style:</span>
                    <p className="text-muted-foreground">{profile.work_style}</p>
                  </div>
                  <div>
                    <span className="font-medium">Time Zone:</span>
                    <p className="text-muted-foreground">{profile.timezone}</p>
                  </div>
                </div>
              </Card>

              {/* Industry Focus */}
              {profile.industry_focus && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Industry Focus</h3>
                  <div className="space-y-2">
                    {profile.industry_focus.primary && (
                      <div>
                        <span className="text-sm font-medium">Primary:</span>
                        <Badge variant="default" className="ml-2">{profile.industry_focus.primary}</Badge>
                      </div>
                    )}
                    {profile.industry_focus.secondary && (
                      <div>
                        <span className="text-sm font-medium">Secondary:</span>
                        <Badge variant="outline" className="ml-2">{profile.industry_focus.secondary}</Badge>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}