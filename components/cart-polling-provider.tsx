"use client";

import { useCartPolling } from "@/hooks/useCartPolling";

export default function CartPollingProvider() {
  useCartPolling();
  return null; // Este componente no renderiza nada, solo ejecuta el polling
}
