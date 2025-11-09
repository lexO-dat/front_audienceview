import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  title: string
  artist: string
  date: string
  time: string
  location: string
  image: string
  price: number
  quantity: number
  category: string
  isReserved: boolean // Indica si fue reservado por agente de voz o manualmente
}

interface CartState {
  items: CartItem[]
  isLoading: boolean
  isInitialized: boolean
  initializeCart: () => Promise<void>
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  getServiceFee: () => number
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      isInitialized: false,

      initializeCart: async () => {
        const state = get()
        
        // Si ya tiene items (del localStorage) o ya se inicializó, no cargar
        if (state.items.length > 0 || state.isInitialized) {
          set({ isInitialized: true })
          return
        }

        set({ isLoading: true })
        try {
          const response = await fetch('/api/cart/mock-items')
          const data = await response.json()
          
          if (data.success) {
            set({ 
              items: data.data,
              isLoading: false,
              isInitialized: true
            })
          }
        } catch (error) {
          console.error('Error loading cart items:', error)
          set({ isLoading: false, isInitialized: true })
        }
      },

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        const state = get()
        return state.items.reduce((acc, item) => acc + item.quantity, 0)
      },

      getSubtotal: () => {
        const state = get()
        return state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      },

      getServiceFee: () => {
        const state = get()
        return state.getSubtotal() * 0.1
      },

      getTotal: () => {
        const state = get()
        return state.getSubtotal() + state.getServiceFee()
      },
    }),
    {
      name: 'cart-storage',
      version: 1, // Incrementar versión para forzar migración
      migrate: (persistedState: unknown, version: number) => {
        if (version === 0) {
          // Migrar datos antiguos agregando isReserved si no existe
          const state = persistedState as { items: Partial<CartItem>[] }
          return {
            ...state,
            items: state.items.map((item: Partial<CartItem>) => ({
              ...item,
              isReserved: item.isReserved ?? false, // Agregar campo si no existe
            })),
          }
        }
        return persistedState
      },
    }
  )
)
