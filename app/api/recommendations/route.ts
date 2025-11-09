import { NextResponse } from 'next/server'

export interface Recommendation {
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

const mockRecommendations: Recommendation[] = [
  // Música
  {
    id: "rec-1",
    title: "Festival de Rock Alternativo",
    artist: "Múltiples Bandas",
    date: "20 Dic 2024",
    time: "16:00",
    location: "Parque Central",
    image: "/concert-stage-lights.png",
    category: "Música",
    price: 95.0,
    originalPrice: 120.0,
    rating: 4.8,
    attendees: 2500,
    description: "El festival de rock más grande del año con bandas internacionales"
  },
  {
    id: "rec-2",
    title: "Noche de Jazz en Vivo",
    artist: "Jazz Ensemble",
    date: "18 Dic 2024",
    time: "21:00",
    location: "Blue Note Club",
    image: "/concert-stage-lights.png",
    category: "Música",
    price: 55.0,
    rating: 4.6,
    attendees: 300,
    description: "Una velada íntima con los mejores músicos de jazz"
  },
  {
    id: "rec-3",
    title: "Concierto Sinfónico",
    artist: "Orquesta Nacional",
    date: "30 Dic 2024",
    time: "19:00",
    location: "Auditorio Nacional",
    image: "/concert-stage-lights.png",
    category: "Música",
    price: 75.0,
    originalPrice: 90.0,
    rating: 4.9,
    attendees: 1200,
    description: "Obras maestras de la música clásica"
  },
  
  // Cine
  {
    id: "rec-4",
    title: "Estreno: Aventura Espacial",
    artist: "Cineplex",
    date: "16 Dic 2024",
    time: "20:30",
    location: "Cine Multiplex Centro",
    image: "/theater-stage-dramatic-lighting.jpg",
    category: "Cine",
    price: 25.0,
    rating: 4.5,
    attendees: 450,
    description: "El blockbuster más esperado del año"
  },
  {
    id: "rec-5",
    title: "Ciclo de Cine Francés",
    artist: "Cinemateca",
    date: "19 Dic 2024",
    time: "18:00",
    location: "Cinemateca Nacional",
    image: "/theater-stage-dramatic-lighting.jpg",
    category: "Cine",
    price: 15.0,
    rating: 4.7,
    attendees: 150,
    description: "Películas clásicas del cine francés"
  },
  {
    id: "rec-6",
    title: "Maratón Marvel",
    artist: "Cine Premium",
    date: "23 Dic 2024",
    time: "12:00",
    location: "Cine IMAX",
    image: "/theater-stage-dramatic-lighting.jpg",
    category: "Cine",
    price: 45.0,
    originalPrice: 60.0,
    rating: 4.8,
    attendees: 600,
    description: "Las mejores películas de superhéroes en pantalla grande"
  },

  // Deportes
  {
    id: "rec-7",
    title: "Final de Básquetbol",
    artist: "Liga Nacional",
    date: "27 Dic 2024",
    time: "19:00",
    location: "Pabellón Deportivo",
    image: "/soccer-football-stadium.jpg",
    category: "Deportes",
    price: 55.0,
    rating: 4.6,
    attendees: 8000,
    description: "La final más emocionante de la temporada"
  },
  {
    id: "rec-8",
    title: "Torneo de Tenis",
    artist: "ATP Tour",
    date: "2 Ene 2025",
    time: "14:00",
    location: "Club de Tenis",
    image: "/soccer-football-stadium.jpg",
    category: "Deportes",
    price: 70.0,
    originalPrice: 85.0,
    rating: 4.7,
    attendees: 3000,
    description: "Los mejores tenistas del mundo en acción"
  },
  {
    id: "rec-9",
    title: "Carrera de Atletismo",
    artist: "Federación Atlética",
    date: "10 Ene 2025",
    time: "08:00",
    location: "Estadio Olímpico",
    image: "/soccer-football-stadium.jpg",
    category: "Deportes",
    price: 35.0,
    rating: 4.4,
    attendees: 5000,
    description: "Maratón internacional con participantes de 30 países"
  },

  // Teatro
  {
    id: "rec-10",
    title: "Romeo y Julieta",
    artist: "Compañía Shakespeare",
    date: "21 Dic 2024",
    time: "20:00",
    location: "Teatro Principal",
    image: "/theater-stage-dramatic-lighting.jpg",
    category: "Teatro",
    price: 50.0,
    rating: 4.9,
    attendees: 400,
    description: "La obra maestra de Shakespeare en una puesta moderna"
  },
  {
    id: "rec-11",
    title: "Comedia Stand-Up",
    artist: "Carlos Martínez",
    date: "26 Dic 2024",
    time: "22:00",
    location: "Teatro Café",
    image: "/theater-stage-dramatic-lighting.jpg",
    category: "Teatro",
    price: 40.0,
    originalPrice: 50.0,
    rating: 4.7,
    attendees: 250,
    description: "Una noche de risas con el mejor comediante del país"
  },
  {
    id: "rec-12",
    title: "Musical: El Fantasma",
    artist: "Broadway Production",
    date: "31 Dic 2024",
    time: "19:00",
    location: "Gran Teatro",
    image: "/theater-stage-dramatic-lighting.jpg",
    category: "Teatro",
    price: 120.0,
    originalPrice: 150.0,
    rating: 5.0,
    attendees: 800,
    description: "El musical más aclamado llega a nuestra ciudad"
  },

  // Festivales
  {
    id: "rec-13",
    title: "Festival Gastronómico",
    artist: "Chefs Internacionales",
    date: "6 Ene 2025",
    time: "11:00",
    location: "Plaza de la Ciudad",
    image: "/art-gallery-colorful-paintings.jpg",
    category: "Festivales",
    price: 30.0,
    rating: 4.6,
    attendees: 10000,
    description: "Sabores del mundo en un solo lugar"
  },
  {
    id: "rec-14",
    title: "Festival de Luces",
    artist: "Artistas Visuales",
    date: "8 Ene 2025",
    time: "19:00",
    location: "Jardín Botánico",
    image: "/art-gallery-colorful-paintings.jpg",
    category: "Festivales",
    price: 25.0,
    originalPrice: 35.0,
    rating: 4.8,
    attendees: 15000,
    description: "Instalaciones lumínicas espectaculares"
  },
  {
    id: "rec-15",
    title: "Feria de Artesanías",
    artist: "Artesanos Locales",
    date: "12 Ene 2025",
    time: "10:00",
    location: "Centro de Convenciones",
    image: "/art-gallery-colorful-paintings.jpg",
    category: "Festivales",
    price: 10.0,
    rating: 4.5,
    attendees: 8000,
    description: "Lo mejor del arte y la artesanía regional"
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 300))

  let filteredRecommendations = mockRecommendations

  if (category && category !== 'all') {
    filteredRecommendations = mockRecommendations.filter(
      rec => rec.category.toLowerCase() === category.toLowerCase()
    )
  }

  return NextResponse.json({
    success: true,
    data: filteredRecommendations,
    total: filteredRecommendations.length
  })
}
