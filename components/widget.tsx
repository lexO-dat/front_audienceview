"use client";

import React, { useEffect, useRef } from "react";
import { addItem } from "@/lib/cartStore";
import events from "@/data/events.json" assert { type: "json" };

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { "agent-id"?: string };
    }
  }
}

export default function ElevenLabs() {
  const lastEventTime = useRef<number>(0);

  useEffect(() => {
    // 🔁 Polling cada 2 segundos
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/add-to-cart", { method: "POST" });
        if (!res.ok) return;

        const data = await res.json();
        if (!data?.timestamp || data.timestamp === lastEventTime.current) return;

        lastEventTime.current = data.timestamp;
        const { nombre, quantity } = data;

        console.log("📢 Evento recibido del backend:", nombre, quantity);

        const foundEvent = events.find((e) =>
          e.name.toLowerCase().includes(nombre.toLowerCase())
        );

        if (!foundEvent) {
          console.warn("⚠️ Evento no encontrado:", nombre);
          return;
        }

        addItem({
          id: foundEvent.id,
          name: foundEvent.name,
          price: foundEvent.price,
          quantity: quantity || 1,
          image: foundEvent.image,
          date: foundEvent.date,
          time: foundEvent.time,
          location: foundEvent.location,
          category: foundEvent.category,
          isReserved: true,
        });

        console.log(`🛒 Agregado al carrito: ${foundEvent.name}`);
      } catch (err) {
        console.error("❌ Error consultando backend:", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Carga del widget
  useEffect(() => {
    if (!document.querySelector('script[src*="convai-widget-embed"]')) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <elevenlabs-convai agent-id="agent_9301k9hrshh2fx2rnhbzwz8xd7k6"></elevenlabs-convai>
  );
}
