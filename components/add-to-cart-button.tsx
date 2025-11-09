"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addItem } from "@/lib/cartStore"     // <-- usa el store nuevo
import { useToast } from "@/components/ui/toast"

export interface EventData {
  id: string
  title: string
  artist: string
  date: string
  time: string
  location: string
  image: string
  category: string
  price: number
}

interface AddToCartButtonProps {
  event: EventData
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showIcon?: boolean
  isReservedByAgent?: boolean
}

export default function AddToCartButton({
  event,
  size = "sm",
  className = "",
  showIcon = true,
  isReservedByAgent = false,
}: AddToCartButtonProps) {
  const { addToast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()

    // 👉 usamos la función global addItem()
    addItem({
      id: event.id,
      name: event.title,       // tu <Cart /> usa "name"
      price: event.price,
      quantity: 1,
      image: event.image,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      isReserved: isReservedByAgent,
    })

    addToast({
      title: "✓ Agregado al carrito",
      description: `${event.title} se ha agregado correctamente`,
      duration: 3000,
    })
  }

  return (
    <Button
      size={size}
      onClick={handleAddToCart}
      className={`bg-primary hover:bg-primary/90 gap-1.5 ${className}`}
    >
      {showIcon && <ShoppingCart className="w-3.5 h-3.5" />}
      Agregar
    </Button>
  )
}