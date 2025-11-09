"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"

// 👇 importa tu API PLANA del carrito
import {
  getItems,
  getItemsCount,
  getTotal,
  removeItemByName,
  updateQuantity,
  subscribeCart,
  type CartItem,
} from "@/lib/cartStore"

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const [items, setItems] = useState<CartItem[]>([])

  // Evitar hydration mismatch
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(t)
  }, [])

  // Cargar snapshot inicial + mantenerse sincronizado
  useEffect(() => {
    if (!mounted) return

    const load = () => setItems(getItems())
    load()

    const unsubscribe = subscribeCart(load)

    window.addEventListener("cart:changed", load)

    return () => {
      unsubscribe()
      window.removeEventListener("cart:changed", load)
    }
  }, [mounted])

  // Totales (puedes usar helpers del store o calcular aquí)
  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0)
  const serviceFee = 0 // ajusta si tienes una comisión (p.ej. 0.1 * subtotal)
  const total = subtotal + serviceFee
  const totalItems = getItemsCount()

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a inicio
        </Link>

        {items.length === 0 ? (
          <div className="w-full">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Mi Carrito</h1>
              <span className="text-muted-foreground">({totalItems} items)</span>
            </div>
            <div className="p-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
              <p className="text-muted-foreground mb-6">
                Explora nuestros eventos y agrega algunos tickets a tu carrito
              </p>
              <Link href="/">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Explorar Eventos
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de items del carrito */}
            <div className="lg:col-span-2 w-full">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold">Mi Carrito</h1>
                <span className="text-muted-foreground">({items.length} items)</span>
              </div>
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      {/* Imagen del evento */}
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden shrink-0 bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Información del evento */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {item.category && (
                                <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                                  {item.category}
                                </span>
                              )}
                              {item.isReserved && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded shadow-sm">
                                  Reservado
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                            {/* Si quieres mostrar artista, agrégalo también al CartItem en el store */}
                          </div>
                          <Button
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeItemByName(item.name)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
                          <div className="text-sm text-muted-foreground">
                            {(item.date || item.time) && <p>{item.date} • {item.time}</p>}
                            {item.location && <p>{item.location}</p>}
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Cantidad */}
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-muted"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <Button
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-muted"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Precio */}
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ${item.price.toFixed(2)} c/u
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Resumen del Pedido</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({totalItems} tickets)</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Comisión de servicio</span>
                    <span className="font-semibold">${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Proceder al Pago
                </Button>

                <Link href="/">
                  <Button className="w-full">
                    Continuar Comprando
                  </Button>
                </Link>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Nota:</strong> Los tickets se enviarán a tu correo electrónico después de completar la compra.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}