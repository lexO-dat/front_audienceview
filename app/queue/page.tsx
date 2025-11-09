"use client"

import { useState, useEffect } from "react"
import { Users } from "lucide-react"
import Image from "next/image"

export default function QueuePage() {
  const [peopleInQueue, setPeopleInQueue] = useState(45)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Cargar el número de personas de localStorage si existe
    const savedQueue = localStorage.getItem("queuePeopleRemaining")
    if (savedQueue) {
      setPeopleInQueue(parseInt(savedQueue))
    }
  }, [])

  // Simulación de la fila: disminuye cada 3 segundos
  useEffect(() => {
    if (!mounted) return

    const timer = setInterval(() => {
      setPeopleInQueue((prev) => {
        const newCount = prev > 0 ? prev - 1 : 0
        localStorage.setItem("queuePeopleRemaining", newCount.toString())
        return newCount
      })
    }, 3000) // Cada 3 segundos se va una persona

    return () => clearInterval(timer)
  }, [mounted])

  const progressPercentage = peopleInQueue > 0 ? ((50 - peopleInQueue) / 50) * 100 : 100
  const estimatedWaitTime = Math.ceil((peopleInQueue * 3) / 60) // minutos estimados

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Franja de fila virtual */}
      <div className="bg-main border-b-2 border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-main-foreground">
              <Users className="w-5 h-5" />
              <span className="font-bold text-lg">Personas en la fila antes que tú</span>
            </div>
            <span className="font-bold text-3xl text-main-foreground tabular-nums">
              {peopleInQueue}
            </span>
          </div>
          
          {/* Barra de progreso */}
          <div className="w-full h-3 bg-secondary-background border-2 border-border rounded-base overflow-hidden">
            <div
              className="h-full bg-foreground transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            
            {peopleInQueue < 10 && peopleInQueue > 0 && (
              <p className="text-main-foreground text-sm font-semibold">
                ⚡ ¡Ya casi es tu turno!
              </p>
            )}

            {peopleInQueue === 0 && (
              <p className="text-main-foreground text-sm font-semibold">
                ¡Es tu turno!
              </p>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 md:py-12 w-full">

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Avatar apuntando al widget */}
            <Image src={"/ticketin.png"} alt="Ticketin" width={500} height={300} />
            <div>
              <p>Descripición de lo que se hace en la fila</p>
            </div>

        </div>
      </main>
    </div>
  )
}
