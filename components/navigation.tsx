"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  PenLine,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  Search,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

interface AuthUser {
  username: string | null
  full_name: string | null
  email: string | null
  avatar_url: string | null
}

/** Returns initials from a display name, falling back to username, then "?" */
function getInitials(name: string | null, username: string | null): string {
  if (name) {
    return name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }
  return username ? username.slice(0, 2).toUpperCase() : '?'
}

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  const [user, setUser] = useState<AuthUser | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (!res.ok) {
          setUser(null)
          return
        }
        const data = await res.json()
        setUser(data.authenticated ? data.user : null)
      } catch {
        setUser(null)
      } finally {
        setAuthLoading(false)
      }
    }

    fetchCurrentUser()
  }, [pathname]) // re-check on every navigation (login / logout flows)

  const isActive = (path: string) => pathname === path || pathname.startsWith(path)

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      if (!res.ok) throw new Error('Failed to log out')
      setUser(null)
      router.push('/auth/signin')
    } catch (error) {
      console.error(error)
    }
  }

  const isAuthenticated = !authLoading && user !== null

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6 text-primary" />
            Blog Haven
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/explore"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/explore') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Explore
            </Link>
            <Link
              href="/authors"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/authors') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Authors
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search — visible to everyone */}
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>

            {/* Auth-loading skeleton — prevents layout shift */}
            {authLoading && (
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            )}

            {/* Authenticated state */}
            {isAuthenticated && (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>

                {/* Write */}
                <Button asChild size="sm">
                  <Link href="/dashboard/create">
                    <PenLine className="h-4 w-4 mr-2" />
                    Write
                  </Link>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        {/* TODO: HARDCODED fallback avatar URL removed — now uses API-provided avatar_url */}
                        {/* Previously: src="https://images.unsplash.com/photo-...face" */}
                        <AvatarImage
                          src={user!.avatar_url ?? undefined}
                          alt={user!.full_name ?? user!.username ?? 'User'}
                        />
                        <AvatarFallback>
                          {getInitials(user!.full_name, user!.username)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {/* TODO: HARDCODED "Alex Johnson" / "alex@alexdev.io" removed — now from JWT */}
                        <p className="font-medium">
                          {user!.full_name ?? user!.username ?? 'User'}
                        </p>
                        {user!.email && (
                          <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {user!.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      {/* TODO: HARDCODED "/profile/alexdev" removed — now uses dynamic username */}
                      <Link href={user!.username ? `/profile/${user!.username}` : '/dashboard'}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile/edit">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {/* Unauthenticated state */}
            {!authLoading && !isAuthenticated && (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}