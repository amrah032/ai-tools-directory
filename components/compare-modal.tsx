"use client"

import { X, Check, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Tool } from "@/lib/tools-data"

interface CompareModalProps {
  tools: Tool[]
  isOpen: boolean
  onClose: () => void
}

const pricingColors = {
  Free: "text-emerald-400",
  Freemium: "text-blue-400",
  Paid: "text-amber-400",
  Enterprise: "text-rose-400",
}

export function CompareModal({ tools, isOpen, onClose }: CompareModalProps) {
  if (!isOpen) return null

  const allFeatures = Array.from(
    new Set(tools.flatMap((tool) => tool.features))
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Compare AI Tools
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Side-by-side comparison of {tools.length} selected tools
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[calc(85vh-88px)]">
          <table className="w-full">
            <thead className="sticky top-0 bg-card z-10">
              <tr className="border-b border-border">
                <th className="p-4 text-left text-sm font-medium text-muted-foreground w-40">
                  Feature
                </th>
                {tools.map((tool) => (
                  <th key={tool.id} className="p-4 text-center min-w-[150px]">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">{tool.icon}</span>
                      <span className="font-semibold text-foreground">
                        {tool.name}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Pricing Row */}
              <tr className="border-b border-border bg-secondary/30">
                <td className="p-4 text-sm font-medium text-muted-foreground">
                  Pricing
                </td>
                {tools.map((tool) => (
                  <td key={tool.id} className="p-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className={`font-semibold ${pricingColors[tool.pricing]}`}
                      >
                        {tool.pricing}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {tool.priceRange}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Use Case Row */}
              <tr className="border-b border-border">
                <td className="p-4 text-sm font-medium text-muted-foreground">
                  Best For
                </td>
                {tools.map((tool) => (
                  <td
                    key={tool.id}
                    className="p-4 text-center text-sm text-foreground/80"
                  >
                    {tool.useCase}
                  </td>
                ))}
              </tr>

              {/* Key Features Header */}
              <tr className="border-b border-border bg-secondary/30">
                <td
                  colSpan={tools.length + 1}
                  className="p-4 text-sm font-semibold text-foreground"
                >
                  Key Features
                </td>
              </tr>

              {/* Feature Rows */}
              {allFeatures.map((feature, index) => (
                <tr
                  key={feature}
                  className={
                    index % 2 === 0 ? "bg-background" : "bg-secondary/10"
                  }
                >
                  <td className="p-4 text-sm text-muted-foreground">
                    {feature}
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="p-4 text-center">
                      {tool.features.includes(feature) ? (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20">
                          <Check className="h-4 w-4 text-emerald-400" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary">
                          <Minus className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-card/95 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            Export Comparison
          </Button>
        </div>
      </div>
    </div>
  )
}
