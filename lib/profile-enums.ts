export enum ExperienceLevel {
  ENTRY_LEVEL = "Entry Level (0-2 years)",
  MID_LEVEL = "Mid-Level (3-5 years)",
  SENIOR_LEVEL = "Senior Level (6-10 years)",
  EXPERT = "Expert (10+ years)",
}

export enum Industry {
  TECHNOLOGY = "Technology",
  BUSINESS = "Business",
  DESIGN = "Design",
  FINANCE = "Finance",
  HEALTHCARE = "Healthcare",
  MARKETING = "Marketing",
  EDUCATION = "Education",
  CONSULTING = "Consulting",
  MEDIA = "Media",
  NON_PROFIT = "Non-Profit",
}

export enum SkillSuggestion {
  REACT = "React",
  NODE_JS = "Node.js",
  TYPESCRIPT = "TypeScript",
  PYTHON = "Python",
  JAVASCRIPT = "JavaScript",
  JAVA = "Java",
  SPRING_BOOT = "Spring Boot",
  REST_API = "REST APIs",
  AWS = "AWS",
  DOCKER = "Docker",
  PROJECT_MANAGEMENT = "Project Management",
  TEAM_LEADERSHIP = "Team Leadership",
  AGILE_SCRUM = "Agile/Scrum",
  DATA_ANALYSIS = "Data Analysis",
  UI_UX_DESIGN = "UI/UX Design",
  DIGITAL_MARKETING = "Digital Marketing",
  CONTENT_STRATEGY = "Content Strategy",
  SEO = "SEO",
}

export enum ContactPreference {
  EMAIL = "Email",
  PHONE = "Phone",
  LINKEDIN = "LinkedIn",
  TWITTER = "Twitter",
}

export enum ExpertiseArea {
  FULL_STACK = "Full-Stack Development",
  FRONTEND = "Frontend Development",
  BACKEND = "Backend Development",
  MOBILE = "Mobile Development",
  DEVOPS = "DevOps",
  DATA_SCIENCE = "Data Science",
  MACHINE_LEARNING = "Machine Learning",
  SYSTEM_ARCHITECTURE = "System Architecture",
  TEAM_LEADERSHIP = "Team Leadership",
  PRODUCT_MANAGEMENT = "Product Management",
  DIGITAL_MARKETING = "Digital Marketing",
  CONTENT_CREATION = "Content Creation",
  BUSINESS_STRATEGY = "Business Strategy",
}

// Derived arrays for use in dropdowns and option lists
export const EXPERIENCE_LEVELS = Object.values(ExperienceLevel)
export const INDUSTRIES = Object.values(Industry)
export const SKILL_SUGGESTIONS = Object.values(SkillSuggestion)
export const EXPERTISE_AREAS = Object.values(ExpertiseArea)
export const CONTACT_PREFERENCES = Object.values(ContactPreference)

/**
 * Maps a backend enum key (e.g. "SENIOR_LEVEL") to its display value
 * (e.g. "Senior Level (6-10 years)"). Returns undefined if not found.
 */
export function toExperienceLevel(key: string | undefined): ExperienceLevel | undefined {
  if (!key) return undefined
  return ExperienceLevel[key as keyof typeof ExperienceLevel]
}

/**
 * Maps a backend enum key (e.g. "NON_PROFIT") to its display value
 * (e.g. "Non-Profit"). Returns undefined if not found.
 */
export function toIndustry(key: string | undefined): Industry | undefined {
  if (!key) return undefined
  return Industry[key as keyof typeof Industry]
}

/**
 * Maps a backend enum key (e.g. "NODE_JS") to its display value
 * (e.g. "Node.js"). Returns undefined if not found.
 */
export function toSkillSuggestion(key: string | undefined): SkillSuggestion | undefined {
  if (!key) return undefined
  return SkillSuggestion[key as keyof typeof SkillSuggestion]
}

/**
 * Maps a backend enum key (e.g. "FULL_STACK") to its display value
 * (e.g. "Full-Stack Development"). Returns undefined if not found.
 */
export function toExpertiseArea(key: string | undefined): ExpertiseArea | undefined {
  if (!key) return undefined
  return ExpertiseArea[key as keyof typeof ExpertiseArea]
}

/**
 * Maps an array of backend enum keys to their display values, dropping any unrecognised keys.
 */
export function toSkillSuggestions(keys: string[] | undefined): SkillSuggestion[] {
  return (keys ?? []).map(toSkillSuggestion).filter((v): v is SkillSuggestion => v !== undefined)
}

export function toExpertiseAreas(keys: string[] | undefined): ExpertiseArea[] {
  return (keys ?? []).map(toExpertiseArea).filter((v): v is ExpertiseArea => v !== undefined)
}

/**
 * Maps an array of backend enum keys (e.g. ["EMAIL", "LINKEDIN"]) to display values
 * (e.g. ["Email", "LinkedIn"]). Drops unrecognised keys.
 */
export function toContactPreferences(keys: string[] | undefined): ContactPreference[] {
  return (keys ?? [])
    .map((k) => ContactPreference[k as keyof typeof ContactPreference])
    .filter((v): v is ContactPreference => v !== undefined)
}
