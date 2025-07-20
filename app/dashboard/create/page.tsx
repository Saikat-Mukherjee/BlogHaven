"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import RichTextEditor from "@/components/rich-text-editor"
import { ImagePlus } from "lucide-react"

export default function CreateBlogPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState("")
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const title = formData.get("title") as string
      const excerpt = formData.get("excerpt") as string

      // TODO: Implement blog creation with backend API
      
      toast({
        title: "Success!",
        description: "Your blog post has been created.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnail(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
          
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter your blog title"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="thumbnail"
                      name="thumbnail"
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

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Write a brief summary of your blog post"
                  className="h-24"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" disabled={isLoading}>
                  Save as Draft
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Publishing..." : "Publish"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}