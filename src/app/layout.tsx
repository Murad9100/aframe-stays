import { TouristProvider } from "@/context/TouristContext";
import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "A-FRAME STAYS — Premium A-Frame Dağ Evləri",
    template: "%s · A-FRAME STAYS",
  },
  description:
    "Azərbaycanın dağlarında əl ilə seçilmiş premium A-Frame evləri. Tarixləri seçin, saniyələr içində WhatsApp ilə bron edin.",
  openGraph: {
    siteName: "A-FRAME STAYS",
    locale: "az_AZ",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf7f1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans bg-paper text-ink min-h-dvh">
        <TouristProvider>{children}</TouristProvider>
        <Toaster />
      </body>
    </html>
  );
}
