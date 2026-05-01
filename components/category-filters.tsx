"use client"

import { cn } from "@/lib/utils"
import { Video, FileText, Image, Music, Code, MessageSquare, Sparkles } from "lucide-react"

const categories = [
  { id: "all", name: "All Categories", icon: Sparkles },
  { id: "video", name: "Video", icon: Video },
  { id: "text", name: "Text", icon: FileText },
  { id: "image", name: "Image", icon: Image },
  { id: "audio", name: "Audio", icon: Music },
  { id: "code", name: "Code", icon: Code },
  { id: "chat", name: "Chat", icon: MessageSquare },
]

interface CategoryFiltersProps {
  selected: string
  onSelect: (category: string) => void
}

export function CategoryFilters({ selected, onSelect }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              selected === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <Icon className="h-4 w-4" />
            {category.name}
          </button>
        )
      })}
    </div>
  )
}
