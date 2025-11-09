"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ticket, Music, Theater, Trophy, Film, House, ShoppingCart, User, ChevronDown, Star } from "lucide-react"

import { getItemsCount, subscribeCart } from "@/lib/cartStore"

export default function Header() {
  const categories = useMemo(() => ([
    { id: "", name: "Inicio", icon: House },
    { id: "recommendations", name: "Ver mis recomendaciones", icon: Star },
  ]), [])

  // Usuario mock
  const user = { name: "Samuel Angulo", email: "hey@samuelangulo.com" }

  // ✅ estado local que se actualiza con el store
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // snapshot inicial
    const load = () => setCartCount(getItemsCount())
    load()

    // suscripción directa al store
    const unsubscribe = subscribeCart(load)

    // también escucha el CustomEvent (por si mutas desde otro lado)
    window.addEventListener("cart:changed", load)

    return () => {
      unsubscribe()
      window.removeEventListener("cart:changed", load)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex flex-row ml-4">
          <Link 
          href="/" 
          className="flex items-center gap-2 font-bold text-lg md:text-xl text-primary shrink-0 hover:text-primary/80 transition-colors group"
        >
          <Ticket className="w-6 h-6 md:w-7 md:h-7 group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden sm:inline">Ticketin</span>
        </Link>

        {/* Nav */}
        <nav className="hidden lg:flex ml-6 items-center gap-7 flex-1 justify-center">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className="flex items-center hover:underline underline-offset-4 gap-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-200 group relative py-1"
            >
              <category.icon className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
              <span>{category.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>
        </div>


        <div className="flex items-center gap-2 md:gap-3">
          {/* Carrito */}
          <Link href="/cart">
            <Button 
              size="sm" 
              className="relative hover:bg-accent/10 hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-5 h-5 md:w-5 md:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-sm w-5 h-5 flex items-center justify-center shadow-lg bg-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Usuario */}
          <div className="relative group">
            <Button 
              size="sm" 
              className="flex items-center gap-2 hover:bg-accent/10 transition-all duration-200 hover:scale-105 active:scale-95 px-3 md:px-4"
            >
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm shadow-md">
                {user.name.charAt(0)}
              </div>
              <span className="hidden md:inline text-sm font-semibold">{user.name.split(' ')[0]}</span>
              <ChevronDown className="w-4 h-4 hidden md:inline group-hover:rotate-180 transition-transform duration-300" />
            </Button>

            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-border/60 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden backdrop-blur-sm group-hover:translate-y-0 translate-y-2">
              <div className="px-4 py-3.5 border-b border-border/60 bg-white">
                <p className="font-bold text-sm text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
              </div>
              <div className="py-2 bg-white">
                <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium hover:bg-muted/50 transition-colors group/item">
                  <User className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                  <span className="group-hover/item:text-primary transition-colors">Mi Perfil</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium hover:bg-muted/50 transition-colors group/item">
                  <Ticket className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                  <span className="group-hover/item:text-primary transition-colors">Mis Tickets</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium hover:bg-muted/50 transition-colors group/item">
                  <ShoppingCart className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                  <span className="group-hover/item:text-primary transition-colors">Mis Pedidos</span>
                </Link>
              </div>
              <div className="border-t border-border/60 py-2 bg-white">
                <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>

    </header>
  )
}