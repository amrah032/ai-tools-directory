"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoginModal } from "@/components/login-modal"

export function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleGetStarted = () => {
    const toolsSection = document.getElementById("tools-directory")
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">AI Directory</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Categories
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Submit Tool
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
