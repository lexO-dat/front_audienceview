import { NextResponse } from "next/server";

let latestGoToCartEvent: any = null;

// Cuando ElevenLabs haga GET /api/gotocart
export async function GET(request: Request) {
  console.log("🛒 Solicitud para ir al carrito recibida");

  latestGoToCartEvent = {
    action: "goto-cart",
    timestamp: Date.now(),
    processed: false // Para saber si ya fue procesado por el frontend
  };

  console.log("🧠 Nuevo evento goto-cart desde ElevenLabs:", latestGoToCartEvent);
  return NextResponse.json({ success: true, event: latestGoToCartEvent });
}

// Endpoint para que el frontend lea el último evento
export async function POST() {
  if (!latestGoToCartEvent || latestGoToCartEvent.processed) {
    return NextResponse.json({ event: null });
  }

  // Marcar como procesado para evitar múltiples navegaciones
  latestGoToCartEvent.processed = true;
  
  const response = {
    action: latestGoToCartEvent.action,
    timestamp: latestGoToCartEvent.timestamp
  };
  
  console.log("📤 Enviando evento goto-cart al frontend:", response);
  return NextResponse.json({ event: response });
}
