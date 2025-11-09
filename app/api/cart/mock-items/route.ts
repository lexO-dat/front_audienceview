import { NextResponse } from 'next/server'

export interface CartItemAPI {
  id: string
  title: string
  artist: string
  date: string
  time: string
  location: string
  image: string
  price: number
  quantity: number
  category: string
  isReserved: boolean
}

// Eventos mockeados para el carrito inicial
const mockCartItems: CartItemAPI[] = [
  {
    id: "1",
    title: "Concierto de Verano",
    artist: "The Midnight Echoes",
    date: "15 Dic 2024",
    time: "20:00",
    location: "Estadio Principal",
    image: "/concert-stage-lights.png",
    price: 89.99,
    quantity: 2,
    category: "Música",
    isReserved: false,
  },
  {
    id: "2",
    title: "Obra Teatral Clásica",
    artist: "Teatro Nacional",
    date: "22 Dic 2024",
    time: "19:30",
    location: "Teatro Gran Vía",
    image: "/theater-stage-dramatic-lighting.jpg",
    price: 45.0,
    quantity: 4,
    category: "Teatro",
    isReserved: true, // Este fue reservado por el agente de voz
  },
  {
    id: "3",
    title: "Campeonato de Fútbol",
    artist: "Liga Profesional",
    date: "28 Dic 2024",
    time: "17:00",
    location: "Estadio Metropolitano",
    image: "/soccer-football-stadium.jpg",
    price: 65.0,
    quantity: 1,
    category: "Deportes",
    isReserved: false,
  },
]

export async function GET() {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 200))

  return NextResponse.json({
    success: true,
    data: mockCartItems,
    total: mockCartItems.length
  })
}
