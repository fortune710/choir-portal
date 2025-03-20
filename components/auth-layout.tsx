import type React from "react"
import Link from "next/link"
import { Music } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Music className="h-6 w-6 text-primary" />
            <span className="text-lg">Choir Portal</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">{children}</main>
      <footer className="border-t py-4 bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex gap-2 items-center">
            <Music className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">© 2025 Choir Portal. All rights reserved.</p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline" href="#">
              Terms
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              Privacy
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              Help
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

