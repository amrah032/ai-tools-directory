"use client"

import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Tool } from "./tool-card"

interface CompareBarProps {
  tools: Tool[]
  onRemove: (toolId: string) => void
  onClear: () => void
}

export function CompareBar({ tools, onRemove, onClear }: CompareBarProps) {
  if (tools.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border p-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground mr-2">
            Comparing ({tools.length}):
          </span>
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full"
            >
              <span className="text-lg">{tool.icon}</span>
              <span className="text-sm font-medium text-foreground">{tool.name}</span>
              <button
                onClick={() => onRemove(tool.id)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear all
          </Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Compare Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
