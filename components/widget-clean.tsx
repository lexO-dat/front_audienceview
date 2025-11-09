"use client";

import React from "react";
import { useRegisterConvaiTools } from "@/hooks/useRegisterConvaiTools";

// 1. Declaramos el custom element para TypeScript
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
  // Definimos los client tools en el scope del componente
  const clientTools = {
    testTool: ({ text }: { text: string }) => {
      console.log("✅ Tool ejecutado por el agente con parámetro:", text);
      return "Funciona!";
    },
    AddEventByVoice: async ({ nombre, quantity }: { nombre: string; quantity: number }) => {
      console.log("🛒 Solicitando agregar:", nombre, quantity);
      
      try {
        // Hacer la llamada al endpoint para registrar el evento
        const response = await fetch(`/api/add-to-cart?nombre=${encodeURIComponent(nombre)}&quantity=${quantity}`, {
          method: 'GET'
        });

        const data = await response.json();

        if (response.ok && data.success) {
          console.log("✅ Evento registrado para agregar al carrito:", data.event);
          return `He agregado "${nombre}" al carrito con ${quantity} ticket${quantity > 1 ? 's' : ''}.`;
        } else {
          console.log("❌ Error al agregar evento:", data.error);
          if (data.availableEvents) {
            const eventsList = data.availableEvents.slice(0, 3).join(", ");
            return `No encontré "${nombre}". Los eventos disponibles incluyen: ${eventsList}`;
          }
          return `No pude encontrar el evento "${nombre}". ¿Podrías repetir el nombre del evento?`;
        }
      } catch (error) {
        console.error("Error al comunicarse con la API:", error);
        return "Hubo un problema al agregar el evento al carrito. Por favor, inténtalo de nuevo.";
      }
    },
  };

  // Registramos el handler usando el hook reutilizable
  useRegisterConvaiTools(clientTools);

  return (
    <>
      {/* El widget en sí */}
      <elevenlabs-convai agent-id="agent_9301k9hrshh2fx2rnhbzwz8xd7k6"></elevenlabs-convai>

      {/* Carga del script del widget */}
      <script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
      ></script>
    </>
  );
}
