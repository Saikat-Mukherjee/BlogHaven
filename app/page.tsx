import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, PenLine, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary">
              Welcome to Blog Haven
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your stories, connect with readers, and join a community of passionate writers.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/auth/signup">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/explore">Explore Posts</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <PenLine className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Write & Share</h3>
              <p className="text-muted-foreground">
                Create beautiful blog posts with our rich text editor and share them with the world.
              </p>
            </Card>
            <Card className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Build Community</h3>
              <p className="text-muted-foreground">
                Connect with like-minded writers and readers. Engage in meaningful discussions.
              </p>
            </Card>
            <Card className="p-6">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Discover Content</h3>
              <p className="text-muted-foreground">
                Find interesting articles tailored to your interests through our recommendation system.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}