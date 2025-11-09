"use client"

import Link from "next/link"
import { Ticket } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <Ticket className="w-6 h-6" />
              TicketHub
            </Link>
            <p className="text-primary-foreground/70 text-sm">
              Tu plataforma confiable para encontrar y comprar tickets de eventos en vivo.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Eventos</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Música
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Teatro
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Deportes
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Ver todos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Compañía</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Prensa
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Accesibilidad
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-primary-foreground/70">© 2025 TicketHub. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition">
              Twitter
            </Link>
            <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition">
              Facebook
            </Link>
            <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
