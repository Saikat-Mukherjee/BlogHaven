import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  BookOpen, 
  MapPin, 
  Star,
  Award,
  Search,
  Filter,
  TrendingUp
} from "lucide-react"
import Link from "next/link"
import EnhancedAuthorCard from "@/components/enhanced-author-card"

/* // Mock authors data
const authorsData = [
  {
    id: "1",
    username: "alexdev",
    full_name: "Alex Johnson",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    bio: "Senior Full-Stack Developer with 8+ years of experience in modern web technologies. Passionate about AI and emerging tech trends.",
    location: "San Francisco, CA",
    joined_date: "2022-03-15T00:00:00Z",
    followers: 1247,
    posts_count: 89,
    total_likes: 3420,
    experience_level: "Expert (10+ years)",
    industry_focus: {
      primary: "Technology",
      secondary: "Fintech"
    },
    core_skills: ["React & Next.js", "Node.js & Express", "TypeScript", "AWS & Cloud Architecture", "Database Design"],
    achievements: [
      "Led development of a platform serving 100K+ users",
      "Reduced application load time by 60% through optimization",
      "Mentored 15+ junior developers across multiple teams"
    ],
    featured: true
  },
  {
    id: "2",
    username: "sarahmanager",
    full_name: "Sarah Chen",
    avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    bio: "Team Lead and Remote Work Advocate with 10+ years of experience managing distributed teams across multiple time zones.",
    location: "Austin, TX",
    joined_date: "2021-08-20T00:00:00Z",
    followers: 892,
    posts_count: 45,
    total_likes: 2180,
    experience_level: "Senior Level (6-10 years)",
    industry_focus: {
      primary: "Management",
      secondary: "HR Tech"
    },
    core_skills: ["Team Leadership", "Agile/Scrum", "Remote Team Management", "Performance Coaching", "Strategic Planning"],
    achievements: [
      "Scaled engineering team from 5 to 25 members",
      "Implemented remote-first culture increasing productivity by 40%",
      "Reduced team turnover by 65% through improved processes"
    ],
    featured: true
  },
  {
    id: "3",
    username: "reactdev",
    full_name: "Mike Rodriguez",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "React specialist and frontend architect with expertise in building large-scale applications for enterprise clients.",
    location: "New York, NY",
    joined_date: "2022-01-10T00:00:00Z",
    followers: 1534,
    posts_count: 67,
    total_likes: 2890,
    experience_level: "Senior Level (6-10 years)",
    industry_focus: {
      primary: "Technology",
      secondary: "E-commerce"
    },
    core_skills: ["React", "TypeScript", "Frontend Architecture", "Performance Optimization", "UI/UX Design"],
    achievements: [
      "Built React component library used by 50+ teams",
      "Improved app performance by 75% through optimization",
      "Speaker at 10+ tech conferences"
    ],
    featured: false
  },
  {
    id: "4",
    username: "ecowarrior",
    full_name: "Emma Wilson",
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    bio: "Environmental advocate and sustainability consultant helping individuals and businesses reduce their environmental impact.",
    location: "Portland, OR",
    joined_date: "2021-11-05T00:00:00Z",
    followers: 623,
    posts_count: 34,
    total_likes: 1456,
    experience_level: "Mid-Level (3-5 years)",
    industry_focus: {
      primary: "Sustainability",
      secondary: "Consulting"
    },
    core_skills: ["Sustainability Consulting", "Environmental Impact Assessment", "Green Technology", "Policy Analysis", "Community Engagement"],
    achievements: [
      "Helped 100+ companies reduce carbon footprint by 30%",
      "Published research on sustainable business practices",
      "Founded local environmental advocacy group"
    ],
    featured: false
  },
  {
    id: "5",
    username: "devmike",
    full_name: "Mike Chen",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "Full-stack developer passionate about performance optimization and scalable architecture. Love working with cutting-edge technologies.",
    location: "Seattle, WA",
    joined_date: "2023-02-14T00:00:00Z",
    followers: 445,
    posts_count: 28,
    total_likes: 892,
    experience_level: "Mid-Level (3-5 years)",
    industry_focus: {
      primary: "Technology",
      secondary: "Gaming"
    },
    core_skills: ["Full-Stack Development", "Performance Optimization", "Microservices", "Docker", "Kubernetes"],
    achievements: [
      "Optimized database queries reducing response time by 80%",
      "Built microservices architecture serving 1M+ requests/day",
      "Contributed to 20+ open source projects"
    ],
    featured: false
  },
  {
    id: "6",
    username: "securitypro",
    full_name: "David Rodriguez",
    avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    bio: "Cybersecurity expert specializing in application security and penetration testing. Helping organizations build secure systems.",
    location: "Miami, FL",
    joined_date: "2022-06-18T00:00:00Z",
    followers: 756,
    posts_count: 42,
    total_likes: 1678,
    experience_level: "Senior Level (6-10 years)",
    industry_focus: {
      primary: "Cybersecurity",
      secondary: "Finance"
    },
    core_skills: ["Application Security", "Penetration Testing", "Security Architecture", "Compliance", "Risk Assessment"],
    achievements: [
      "Identified and fixed 500+ security vulnerabilities",
      "Led security audits for Fortune 500 companies",
      "Certified Ethical Hacker and Security Consultant"
    ],
    featured: false
  }
] */
const authorsData: any[] = []

/* const experienceLevels = ["All Levels", "Entry Level (0-2 years)", "Mid-Level (3-5 years)", "Senior Level (6-10 years)", "Expert (10+ years)"]
const industries = ["All Industries", "Technology", "Management", "Sustainability", "Cybersecurity", "Design", "Marketing", "Finance"] */
const experienceLevels: string[] = []
const industries: string[] = []

export default function AuthorsPage() {
  const featuredAuthors = authorsData.filter(author => author.featured)
  const allAuthors = authorsData

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Discover Amazing Authors</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with talented professionals, learn from their expertise, and follow their journey
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search authors by name, skills, or expertise..."
                  className="pl-10"
                />
              </div>
            </div>
            <Select defaultValue="All Levels">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="All Industries">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="followers">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="followers">Most Followers</SelectItem>
                <SelectItem value="posts">Most Posts</SelectItem>
                <SelectItem value="likes">Most Liked</SelectItem>
                <SelectItem value="recent">Recently Joined</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Featured Authors */}
        {featuredAuthors.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-yellow-500" />
              <h2 className="text-2xl font-semibold">Featured Authors</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredAuthors.map((author) => (
                <EnhancedAuthorCard 
                  key={author.id} 
                  author={author} 
                  showFullProfile={true}
                  className="border-2 border-yellow-200 bg-yellow-50/50"
                />
              ))}
            </div>
          </div>
        )}

        {/* All Authors */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">All Authors</h2>
          <p className="text-muted-foreground">
            Showing {allAuthors.length} talented professionals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {allAuthors.map((author) => (
            <EnhancedAuthorCard 
              key={author.id} 
              author={author} 
              showFullProfile={true}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Authors
          </Button>
        </div>

        {/* Stats Section */}
        <Card className="p-8 mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-6">Join Our Community of Experts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Professional Authors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Industries Represented</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Articles Published</div>
            </div>
          </div>
          <Button asChild size="lg">
            <Link href="/profile/edit">
              Create Your Professional Profile
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}