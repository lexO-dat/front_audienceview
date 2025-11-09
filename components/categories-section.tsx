"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Music, Theater, Trophy, Film, Users } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  count: number
}

const categories: Category[] = [
  { id: "musica", name: "Música", icon: <Music className="w-6 h-6" />, color: "text-blue-600", count: 12420 },
  { id: "cine", name: "Cine", icon: <Film className="w-6 h-6" />, color: "text-purple-600", count: 8750 },
  { id: "deportes", name: "Deportes", icon: <Trophy className="w-6 h-6" />, color: "text-red-600", count: 5680 },
  { id: "teatro", name: "Teatro", icon: <Theater className="w-6 h-6" />, color: "text-pink-600", count: 3240 },
  { id: "festivales", name: "Festivales", icon: <Users className="w-6 h-6" />, color: "text-green-600", count: 2890 },
]

export default function CategoriesSection() {
  return (
    <section id="categorias" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Explora por Categoría</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Descubre eventos en tus géneros favoritos</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              className="h-auto flex flex-col items-center justify-center gap-3 p-6 rounded-lg hover:bg-card hover:border-primary transition-all group cursor-pointer bg-transparent"
            >
              <div className={`${category.color} group-hover:scale-110 transition-transform`}>{category.icon}</div>
              <div className="text-center">
                <p className="font-semibold text-sm">{category.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{category.count.toLocaleString()} eventos</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
