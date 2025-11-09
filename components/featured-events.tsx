"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react"
import AddToCartButton from "@/components/add-to-cart-button"

interface Event {
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
}

const featuredEvents: Event[] = [
  {
    "id": "1",
    "title": "Chico Trujillo",
    "artist": "The Midnight Echoes",
    "date": "15 Dic 2024",
    "time": "20:00",
    "location": "Estadio Principal",
    "image": "/concert-stage-lights.png",
    "category": "Music",
    "price": 89.99,
    "originalPrice": 120
  },
  {
    "id": "2",
    "title": "Beethoven",
    "artist": "Teatro Nacional",
    "date": "22 Dic 2024",
    "time": "19:30",
    "location": "Teatro Gran Vía",
    "image": "/theater-stage-dramatic-lighting.jpg",
    "category": "Teatro",
    "price": 45.0
  },
  {
    "id": "3",  
    "title": "Colo Colo vs Catolica",
    "artist": "Liga Profesional",
    "date": "28 Dic 2024",
    "time": "17:00",
    "location": "Estadio Metropolitano",
    "image": "/soccer-football-stadium.jpg",
    "category": "Deportes",
    "price": 65.0,
    "originalPrice": 85
  },
  {
    "id": "4",
    "title": "Van Gogh",
    "artist": "Multi-artistas",
    "date": "5 Ene 2025",
    "time": "10:00",
    "location": "Centro de Exposiciones",
    "image": "/art-gallery-colorful-paintings.jpg",
    "category": "Arte",
    "price": 35.0
  }
]



export default function FeaturedEvents() {
  return (
    <section id="eventos" className="py-16 md:py-24 bg-linear-to-b from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header mejorado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-4">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Eventos Destacados
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Los mejores eventos que no puedes perderte
            </p>
          </div>
          <Button 
            className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 py-5 font-semibold shadow-lg transition-all duration-300 hover:scale-105 group"
          >
            Ver todos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Grid de eventos con mejor espaciado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {featuredEvents.map((event) => (
            <div 
              key={event.id} 
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-border/50 hover:border-primary/20 bg-card "
            >
              {/* Imagen con overlay mejorado */}
              <div className="relative h-52 overflow-hidden bg-muted">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badge de categoría mejorado */}
                <div className="absolute top-3 right-3 bg-primary/95 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg border border-primary-foreground/10">
                  {event.category}
                </div>
                
                {/* Badge de descuento mejorado */}
                {event.originalPrice && (
                  <div className="absolute top-3 left-3 bg-accent/95 backdrop-blur-sm text-accent-foreground px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                    -{Math.round(((event.originalPrice - event.price) / event.originalPrice) * 100)}%
                  </div>
                )}
              </div>

              {/* Contenido de la tarjeta mejorado */}
              <div className="p-5">
                {/* Artista */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                    {event.artist}
                  </p>
                </div>
                
                {/* Título */}
                <h3 className="font-bold text-lg text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>

                {/* Información del evento con mejor diseño */}
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground group/item hover:text-foreground transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover/item:bg-primary/10 transition-colors">
                      <Calendar className="w-4 h-4 group-hover/item:text-primary transition-colors" />
                    </div>
                    <span className="font-medium">{event.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground group/item hover:text-foreground transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover/item:bg-primary/10 transition-colors">
                      <Clock className="w-4 h-4 group-hover/item:text-primary transition-colors" />
                    </div>
                    <span className="font-medium">{event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground group/item hover:text-foreground transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover/item:bg-primary/10 transition-colors">
                      <MapPin className="w-4 h-4 group-hover/item:text-primary transition-colors" />
                    </div>
                    <span className="font-medium line-clamp-1">{event.location}</span>
                  </div>
                </div>

                {/* Precio mejorado */}
                <div className="flex items-center justify-between mb-4 pt-4 border-t border-border/50">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-medium mb-1">Desde</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        ${event.price}
                      </span>
                      {event.originalPrice && (
                        <span className="text-sm line-through text-muted-foreground font-medium">
                          ${event.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botón mejorado */}
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
                  size="default"
                  className="w-full font-semibold py-5 shadow-md hover:shadow-lg transition-all duration-300"
                  showIcon={true}
                  isReservedByAgent={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Botón móvil mejorado */}
        <Button 
          className="w-full md:hidden mt-8 bg-primary text-primary-foreground hover:bg-primary/90 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          Ver todos los eventos
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  )
}