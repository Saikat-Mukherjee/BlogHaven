"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { ArrowLeft, Save, Upload, X, Plus } from "lucide-react"
import Link from "next/link"

const experienceLevels = [
  "Entry Level (0-2 years)",
  "Mid-Level (3-5 years)", 
  "Senior Level (6-10 years)",
  "Expert (10+ years)"
]

const industries = [
  "Technology", "Business", "Design", "Finance", "Healthcare", 
  "Marketing", "Education", "Consulting", "Media", "Non-Profit"
]

const skillSuggestions = [
  "React", "Node.js", "TypeScript", "Python", "JavaScript", "AWS", "Docker",
  "Project Management", "Team Leadership", "Agile/Scrum", "Data Analysis",
  "UI/UX Design", "Digital Marketing", "Content Strategy", "SEO"
]

const expertiseAreas = [
  "Full-Stack Development", "Frontend Development", "Backend Development",
  "Mobile Development", "DevOps", "Data Science", "Machine Learning",
  "System Architecture", "Team Leadership", "Product Management",
  "Digital Marketing", "Content Creation", "Business Strategy"
]

export default function EditProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [avatar, setAvatar] = useState<string | null>("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face")
  const [newSkill, setNewSkill] = useState("")
  const [formData, setFormData] = useState({
    full_name: "Alex Johnson",
    username: "alexdev",
    bio: "Senior Full-Stack Developer with 8+ years of experience in modern web technologies. Passionate about AI and emerging tech trends.",
    professional_summary: "Innovative full-stack developer specializing in React, Node.js, and cloud architecture. I help startups and enterprises build scalable web applications that drive business growth.",
    experience_level: "Expert (10+ years)",
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)",
    website: "https://alexdev.io",
    email: "alex@alexdev.io",
    phone: "+1 (555) 123-4567",
    linkedin: "https://linkedin.com/in/alexjohnson",
    twitter: "https://twitter.com/alexdev",
    github: "https://github.com/alexdev",
    primary_industry: "Technology",
    secondary_industry: "Fintech",
    availability: "Available for consulting",
    work_style: "Remote-first, collaborative",
    native_language: "English",
    professional_language: "Spanish",
    conversational_language: "French",
    contact_preferences: ["Email", "LinkedIn"]
  })
  
  const [coreSkills, setCoreSkills] = useState([
    "React & Next.js", "Node.js & Express", "TypeScript", "AWS & Cloud Architecture", "Database Design"
  ])
  
  const [selectedExpertise, setSelectedExpertise] = useState([
    "Full-Stack Development", "System Architecture", "Team Leadership"
  ])
  
  const [achievements, setAchievements] = useState([
    "Led development of a platform serving 100K+ users",
    "Reduced application load time by 60% through optimization", 
    "Mentored 15+ junior developers across multiple teams"
  ])
  
  const [interests, setInterests] = useState([
    "AI/Machine Learning", "Open Source Contributions", "Tech Mentoring"
  ])

  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement profile update with backend API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      toast({
        title: "Profile updated!",
        description: "Your professional profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    if (newSkill.trim() && coreSkills.length < 5 && !coreSkills.includes(newSkill.trim())) {
      setCoreSkills([...coreSkills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setCoreSkills(coreSkills.filter(skill => skill !== skillToRemove))
  }

  const toggleExpertise = (area: string) => {
    if (selectedExpertise.includes(area)) {
      setSelectedExpertise(selectedExpertise.filter(item => item !== area))
    } else if (selectedExpertise.length < 3) {
      setSelectedExpertise([...selectedExpertise, area])
    }
  }

  const addAchievement = () => {
    setAchievements([...achievements, ""])
  }

  const updateAchievement = (index: number, value: string) => {
    const updated = [...achievements]
    updated[index] = value
    setAchievements(updated)
  }

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index))
  }

  const addInterest = () => {
    setInterests([...interests, ""])
  }

  const updateInterest = (index: number, value: string) => {
    const updated = [...interests]
    updated[index] = value
    setInterests(updated)
  }

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index))
  }

  const toggleContactPreference = (preference: string) => {
    const current = formData.contact_preferences
    if (current.includes(preference)) {
      handleInputChange("contact_preferences", current.filter(p => p !== preference))
    } else {
      handleInputChange("contact_preferences", [...current, preference])
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/profile/alexdev">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Profile
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Edit Professional Profile</h1>
                <p className="text-muted-foreground">Update your professional information and showcase your expertise</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
              
              {/* Avatar Upload */}
              <div className="flex items-center gap-6 mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatar || ""} alt="Profile picture" />
                  <AvatarFallback className="text-lg">{formData.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="avatar" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted">
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </div>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground mt-2">
                    Professional headshot, clear background, business attire. Max 2MB, JPG or PNG.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="City, State/Country"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Input
                    id="timezone"
                    value={formData.timezone}
                    onChange={(e) => handleInputChange("timezone", e.target.value)}
                    placeholder="PST (UTC-8)"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Brief description of yourself"
                  className="h-24"
                />
              </div>
            </Card>

            {/* Professional Summary */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Professional Summary</h2>
              <div className="space-y-2">
                <Label htmlFor="professional_summary">Professional Summary *</Label>
                <Textarea
                  id="professional_summary"
                  value={formData.professional_summary}
                  onChange={(e) => handleInputChange("professional_summary", e.target.value)}
                  placeholder="2-3 sentences highlighting your key strengths and career focus"
                  className="h-32"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Highlight your key strengths, career focus, and what makes you unique as a professional.
                </p>
              </div>
            </Card>

            {/* Experience & Skills */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Experience & Skills</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="experience_level">Experience Level *</Label>
                  <Select value={formData.experience_level} onValueChange={(value) => handleInputChange("experience_level", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary_industry">Primary Industry *</Label>
                  <Select value={formData.primary_industry} onValueChange={(value) => handleInputChange("primary_industry", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Core Skills */}
              <div className="space-y-4 mb-6">
                <Label>Core Skills (Select up to 5) *</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {coreSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                    </Badge>
                  ))}
                </div>
                {coreSkills.length < 5 && (
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill} disabled={!newSkill.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {skillSuggestions.filter(skill => !coreSkills.includes(skill)).slice(0, 8).map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => coreSkills.length < 5 && setCoreSkills([...coreSkills, skill])}
                    >
                      + {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Areas of Expertise */}
              <div className="space-y-4">
                <Label>Areas of Expertise (Choose 3) *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {expertiseAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={selectedExpertise.includes(area)}
                        onCheckedChange={() => toggleExpertise(area)}
                        disabled={!selectedExpertise.includes(area) && selectedExpertise.length >= 3}
                      />
                      <Label htmlFor={area} className="text-sm">{area}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Industry Focus */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Industry Focus</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primary_industry">Primary Industry *</Label>
                  <Select value={formData.primary_industry} onValueChange={(value) => handleInputChange("primary_industry", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary_industry">Secondary Industry</Label>
                  <Select value={formData.secondary_industry} onValueChange={(value) => handleInputChange("secondary_industry", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select secondary industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.filter(industry => industry !== formData.primary_industry).map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Professional Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateAchievement(index, e.target.value)}
                      placeholder="Describe a notable accomplishment"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeAchievement(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addAchievement}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </Card>

            {/* Languages */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Languages</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="native_language">Native Language *</Label>
                  <Input
                    id="native_language"
                    value={formData.native_language}
                    onChange={(e) => handleInputChange("native_language", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="professional_language">Professional Language</Label>
                  <Input
                    id="professional_language"
                    value={formData.professional_language}
                    onChange={(e) => handleInputChange("professional_language", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conversational_language">Conversational Language</Label>
                  <Input
                    id="conversational_language"
                    value={formData.conversational_language}
                    onChange={(e) => handleInputChange("conversational_language", e.target.value)}
                  />
                </div>
              </div>
            </Card>

            {/* Professional Interests */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Professional Interests</h2>
              <div className="space-y-4">
                {interests.map((interest, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={interest}
                      onChange={(e) => updateInterest(index, e.target.value)}
                      placeholder="What are you passionate about professionally?"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeInterest(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addInterest}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Interest
                </Button>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange("twitter", e.target.value)}
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={formData.github}
                    onChange={(e) => handleInputChange("github", e.target.value)}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>

              {/* Contact Preferences */}
              <div className="space-y-4">
                <Label>Contact Preferences *</Label>
                <div className="flex flex-wrap gap-4">
                  {["Email", "Phone", "LinkedIn", "Twitter"].map((preference) => (
                    <div key={preference} className="flex items-center space-x-2">
                      <Checkbox
                        id={preference}
                        checked={formData.contact_preferences.includes(preference)}
                        onCheckedChange={() => toggleContactPreference(preference)}
                      />
                      <Label htmlFor={preference}>{preference}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Work Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Work Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => handleInputChange("availability", e.target.value)}
                    placeholder="e.g., Available for consulting, Full-time, Part-time"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="work_style">Preferred Work Style</Label>
                  <Input
                    id="work_style"
                    value={formData.work_style}
                    onChange={(e) => handleInputChange("work_style", e.target.value)}
                    placeholder="e.g., Remote-first, Hybrid, On-site"
                  />
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button variant="outline" type="button" asChild>
                <Link href="/profile/alexdev">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}