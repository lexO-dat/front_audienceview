import { NextResponse } from "next/server";
import eventsData from "@/data/events.json";

let latestCartEvent: any = null;

// Cuando ElevenLabs haga GET /api/add-to-cart?nombre=...&quantity=...
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nombre = searchParams.get("nombre");
  const quantity = Number(searchParams.get("quantity") || "1");

  if (!nombre || typeof nombre !== 'string') {
    return NextResponse.json({ error: "Missing or invalid 'nombre'" }, { status: 400 });
  }

  // Buscar el evento en la base de datos
  const evento = eventsData.find(
    (ev) => ev.title.toLowerCase() === nombre.toLowerCase().trim()
  );

  if (!evento) {
    console.log("❌ Evento no encontrado:", nombre);
    return NextResponse.json({ 
      error: `Evento "${nombre}" no encontrado`,
      availableEvents: eventsData.map(e => e.title)
    }, { status: 404 });
  }

  latestCartEvent = {
    evento: {
      id: evento.id,
      title: evento.title,
      artist: evento.artist,
      date: evento.date,
      time: evento.time,
      location: evento.location,
      image: evento.image,
      category: evento.category,
      price: evento.price
    },
    quantity: isNaN(quantity) ? 1 : quantity,
    timestamp: Date.now(),
    processed: false // Para saber si ya fue procesado por el frontend
  };

  console.log("🧠 Nuevo evento recibido desde ElevenLabs:", latestCartEvent);
  return NextResponse.json({ success: true, event: latestCartEvent });
}

// Endpoint para que el frontend lea el último evento
export async function POST() {
  if (!latestCartEvent || latestCartEvent.processed) {
    return NextResponse.json({ event: null });
  }

  // Marcar como procesado para evitar múltiples agregados
  latestCartEvent.processed = true;
  
  const response = {
    evento: latestCartEvent.evento,
    quantity: latestCartEvent.quantity,
    timestamp: latestCartEvent.timestamp
  };
  
  console.log("📤 Enviando evento al frontend para procesar:", response);
  return NextResponse.json({ event: response });
}
