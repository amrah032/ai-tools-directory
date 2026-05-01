"use client"

import { ToolCard, type Tool } from "./tool-card"

interface ToolsGridProps {
  tools: Tool[]
  selectedTools: string[]
  onCompareToggle: (toolId: string) => void
}

export function ToolsGrid({ tools, selectedTools, onCompareToggle }: ToolsGridProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No tools found matching your criteria.</p>
        <p className="text-muted-foreground/60 text-sm mt-2">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          isSelected={selectedTools.includes(tool.id)}
          onCompareToggle={onCompareToggle}
        />
      ))}
    </div>
  )
}
