// /src/lib/cartStore.ts
export type CartItem = {
  id: string
  name: string      // tu <Cart /> usa name
  price: number
  quantity: number
  image?: string
  date?: string
  time?: string
  location?: string
  category?: string
  isReserved?: boolean
}

// ---- estado de módulo ----
let _items: CartItem[] = []

// (opcional) hidratar desde localStorage en cliente
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem("cart:items")
    if (raw) _items = JSON.parse(raw)
  } catch {}
}

// listeners para suscripciones (alternativa a CustomEvent)
const listeners = new Set<() => void>()

function persistAndNotify() {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart:items", JSON.stringify(_items))
    window.dispatchEvent(new CustomEvent("cart:changed")) // ya lo usas en <Cart />
  }
  // notificar suscriptores
  listeners.forEach(fn => fn())
}

// ---------- API pública (plana) ----------
export function getItems(): CartItem[] {
  return _items
}

export function getTotal(): number {
  return _items.reduce((acc, it) => acc + it.price * it.quantity, 0)
}

export function addItem(item: CartItem) {
  const found = _items.find(i => i.id === item.id)
  if (found) {
    found.quantity += item.quantity
  } else {
    _items.push({ ...item })
  }
  persistAndNotify()
}

export function removeItemByName(name: string) {
  _items = _items.filter(i => i.name !== name)
  persistAndNotify()
}

export function updateQuantity(id: string, qty: number) {
  if (qty <= 0) {
    _items = _items.filter(i => i.id !== id)
  } else {
    _items = _items.map(i => (i.id === id ? { ...i, quantity: qty } : i))
  }
  persistAndNotify()
}
// Cantidad de items en el carrito
export function getItemsCount(): number {
  return _items.reduce((acc, it) => acc + it.quantity, 0)
}

// Suscripción opcional (si no quieres usar window events)
export function subscribeCart(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}