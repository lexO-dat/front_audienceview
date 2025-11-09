"use client";

import { useEffect } from "react";

/**
 * Registra herramientas cliente (client tools) con el widget ElevenLabs ConvAI.
 * Esto permite que el agente ejecute funciones definidas en tu frontend.
 */
export function useRegisterConvaiTools(tools: Record<string, any>) {
  useEffect(() => {
    const tryRegister = () => {
      const convai = (window as any)?.elevenlabs?.convai;
      if (convai && typeof convai.registerClientTools === "function") {
        convai.registerClientTools(tools);
        console.log("✅ ElevenLabs tools registered:", Object.keys(tools));
        return true;
      }
      return false;
    };

    // Intentar registrar cada 1s hasta que el script cargue
    if (!tryRegister()) {
      const interval = setInterval(() => {
        if (tryRegister()) clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [tools]);
}
