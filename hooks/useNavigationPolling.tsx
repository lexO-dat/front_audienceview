"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function useNavigationPolling() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPollingRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const pollForNavigationEvents = async () => {
      if (isPollingRef.current) return; // Evitar llamadas concurrentes
      
      try {
        isPollingRef.current = true;
        const response = await fetch("/api/gotocart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.warn("Error al hacer polling de navegación:", response.status);
          return;
        }

        const data = await response.json();
        
        if (data.event && data.event.action === "goto-cart") {
          console.log("🧭 Procesando navegación al carrito:", data.event);
          
          // Navegar al carrito
          router.push("/cart");
          
          console.log("✅ Navegando al carrito");
        }
      } catch (error) {
        console.error("Error en polling de navegación:", error);
      } finally {
        isPollingRef.current = false;
      }
    };

    // Iniciar polling cada 2 segundos
    intervalRef.current = setInterval(pollForNavigationEvents, 2000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [router]);
}
