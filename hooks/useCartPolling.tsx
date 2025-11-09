"use client";

import { useEffect, useRef } from "react";
import { addItem } from "@/lib/cartStore";

export function useCartPolling() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPollingRef = useRef(false);

  useEffect(() => {
    const pollForCartEvents = async () => {
      if (isPollingRef.current) return; // Evitar llamadas concurrentes
      
      try {
        isPollingRef.current = true;
        const response = await fetch("/api/add-to-cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.warn("Error al hacer polling del carrito:", response.status);
          return;
        }

        const data = await response.json();
        
        if (data.event && data.event.evento) {
          const { evento, quantity } = data.event;
          
          console.log("🛒 Procesando evento del carrito:", evento);
          
          // Agregar al carrito usando el store existente
          addItem({
            id: evento.id,
            name: evento.title,
            price: evento.price,
            quantity: quantity || 1,
            image: evento.image,
            date: evento.date,
            time: evento.time,
            location: evento.location,
            category: evento.category,
            isReserved: true, // Marcado como reservado por el agente
          });

          console.log("✅ Evento agregado al carrito:", evento.title);
        }
      } catch (error) {
        console.error("Error en polling del carrito:", error);
      } finally {
        isPollingRef.current = false;
      }
    };

    // Iniciar polling cada 2 segundos
    intervalRef.current = setInterval(pollForCartEvents, 2000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
}
