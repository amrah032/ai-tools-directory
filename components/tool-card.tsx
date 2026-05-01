"use client"

import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Tool } from "@/lib/data"

export type { Tool }

interface ToolCardProps {
  tool: Tool
  isSelected: boolean
  onCompareToggle: (toolId: string) => void
}

const pricingColors = {
  Free: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Freemium: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Paid: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Enterprise: "bg-rose-500/20 text-rose-400 border-rose-500/30",
}

export function ToolCard({ tool, isSelected, onCompareToggle }: ToolCardProps) {
  return (
    <div className="group relative bg-card border border-border rounded-xl p-6 transition-all hover:border-muted-foreground/30 hover:shadow-lg hover:shadow-black/20">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-2xl">
          {tool.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{tool.name}</h3>
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {tool.description}
          </p>
          <div className="flex items-center gap-2 mb-3">
            <span
              className={cn(
                "px-2.5 py-0.5 text-xs font-medium rounded-full border",
                pricingColors[tool.pricing]
              )}
            >
              {tool.pricing}
            </span>
            {tool.monthlyPrice !== null && (
              <span className="text-xs text-muted-foreground">
                ${tool.monthlyPrice}/mo
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a href={tool.affiliateLink} target="_blank" rel="noopener noreferrer">
                Get Started
                <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </Button>
            <Button
              variant={isSelected ? "secondary" : "outline"}
              size="sm"
              onClick={() => onCompareToggle(tool.id)}
              className={cn(
                "text-xs px-3",
                isSelected && "bg-secondary text-foreground border-accent"
              )}
            >
              {isSelected ? "Selected" : "Compare"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
