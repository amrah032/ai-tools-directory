"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { CategoryFilters } from "@/components/category-filters"
import { ToolsGrid } from "@/components/tools-grid"
import { CompareBar } from "@/components/compare-bar"
import { CompareModal } from "@/components/compare-modal"
import { tools } from "@/lib/data"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false)

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const selectedToolsData = useMemo(() => {
    return tools.filter((tool) => selectedTools.includes(tool.id))
  }, [selectedTools])

  const handleCompareToggle = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : prev.length < 4
          ? [...prev, toolId]
          : prev
    )
  }

  const handleRemoveFromCompare = (toolId: string) => {
    setSelectedTools((prev) => prev.filter((id) => id !== toolId))
  }

  const handleClearCompare = () => {
    setSelectedTools([])
  }

  const handleCompareNow = () => {
    if (selectedTools.length >= 2) {
      setIsCompareModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsCompareModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Find Your Perfect AI Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Discover and compare the best AI tools for video, text, image generation, and more. 
            Your one-stop directory for cutting-edge AI solutions.
          </p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </section>

        {/* Category Filters */}
        <section className="mb-10">
          <CategoryFilters
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </section>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredTools.length}</span> tools
            {selectedCategory !== "all" && (
              <> in <span className="font-medium text-foreground capitalize">{selectedCategory}</span></>
            )}
          </p>
          {selectedTools.length > 0 && (
            <p className="text-sm text-accent">
              {selectedTools.length} tool{selectedTools.length !== 1 ? "s" : ""} selected for comparison
            </p>
          )}
        </div>

        {/* Tools Grid */}
        <ToolsGrid
          tools={filteredTools}
          selectedTools={selectedTools}
          onCompareToggle={handleCompareToggle}
        />
      </main>

      {/* Compare Bar */}
      <CompareBar
        tools={selectedToolsData}
        onRemove={handleRemoveFromCompare}
        onClear={handleClearCompare}
        onCompareNow={handleCompareNow}
      />

      {/* Compare Modal */}
      <CompareModal
        tools={selectedToolsData}
        isOpen={isCompareModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
