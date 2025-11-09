"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Clock, Star, Users, Loader2 } from "lucide-react"
import AddToCartButton from "@/components/add-to-cart-button"

interface Recommendation {
  id: string
  title: string
  artist: string
  date: string
  time: string
  location: string
  image: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  attendees: number
  description: string
}

const categories = [
  { id: "all", name: "Todas" },
  { id: "música", name: "Música" },
  { id: "cine", name: "Cine" },
  { id: "deportes", name: "Deportes" },
  { id: "teatro", name: "Teatro" },
  { id: "festivales", name: "Festivales" },
]

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const searchParams = useSearchParams()

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  useEffect(() => {
    fetchRecommendations(selectedCategory)
  }, [selectedCategory])

  const fetchRecommendations = async (category: string) => {
    setLoading(true)
    try {
      const url = category === "all" 
        ? "/api/recommendations"
        : `/api/recommendations?category=${encodeURIComponent(category)}`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.success) {
        setRecommendations(data.data)
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error)
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-linear-to-b from-background via-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          {/* Header Section */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
              Recomendaciones para Ti
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Eventos seleccionados especialmente según tus preferencias
            </p>
          </div>

          {/* Category Filters */}
          <div className="mb-8 md:mb-10">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`rounded-full px-4 md:px-6 py-2 font-medium transition-all ${
                    selectedCategory === category.id
                      ? "shadow-lg hover:shadow-xl"
                      : "hover:border-primary"
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Empty State */}
          {!loading && recommendations.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">
                No se encontraron recomendaciones para esta categoría
              </p>
            </div>
          )}

          {/* Grid de Recomendaciones */}
          {!loading && recommendations.length > 0 && (
            <>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  {recommendations.length} {recommendations.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                {recommendations.map((event) => (
                  <Card 
                    key={event.id} 
                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-border/50 hover:border-primary/20 bg-card hover:-translate-y-2"
                  >
                    {/* Imagen */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Badge de categoría */}
                      <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-foreground">
                          {event.category}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-semibold text-foreground">
                          {event.rating}
                        </span>
                      </div>

                      {/* Descuento */}
                      {event.originalPrice && (
                        <div className="absolute bottom-3 right-3 bg-red-500 text-white px-2 py-1 rounded-md">
                          <span className="text-xs font-bold">
                            -{Math.round((1 - event.price / event.originalPrice) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Contenido */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {event.artist}
                        </p>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>

                      {/* Info */}
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{event.date}</span>
                          <Clock className="w-3.5 h-3.5 ml-1" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5" />
                          <span>{event.attendees.toLocaleString()} asistentes</span>
                        </div>
                      </div>

                      {/* Footer con precio */}
                      <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                        <div>
                          {event.originalPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                              ${event.originalPrice.toFixed(2)}
                            </p>
                          )}
                          <p className="text-lg font-bold text-primary">
                            ${event.price.toFixed(2)}
                          </p>
                        </div>
                        <AddToCartButton 
                          event={{
                            id: event.id,
                            title: event.title,
                            artist: event.artist,
                            date: event.date,
                            time: event.time,
                            location: event.location,
                            image: event.image,
                            category: event.category,
                            price: event.price,
                          }}
                          size="sm"
                          isReservedByAgent={false}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
