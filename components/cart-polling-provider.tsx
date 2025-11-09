"use client";

import { useCartPolling } from "@/hooks/useCartPolling";
import { useNavigationPolling } from "@/hooks/useNavigationPolling";

export default function CartPollingProvider() {
  useCartPolling();
  useNavigationPolling();
  return null; // Este componente no renderiza nada, solo ejecuta el polling
}
