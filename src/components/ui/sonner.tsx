"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      richColors
      closeButton
      gap={8}
      toastOptions={{
        style: {
          borderRadius: "16px",
          fontFamily: "inherit",
          boxShadow: "0 20px 50px -24px rgb(33 26 18 / 0.3)",
        },
      }}
    />
  );
}
