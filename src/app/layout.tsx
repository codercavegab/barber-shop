import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const sans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Estudio & Navaja | Reservas de Barbería 💈",
  description: "Reservá tu turno con el barbero que prefieras. Agendá online de forma simple, rápida y sin esperas.",
  openGraph: {
    title: "Estudio & Navaja | Reservas de Barbería",
    description: "Reservá tu turno con el barbero que prefieras de manera online en segundos.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio & Navaja | Reservas de Barbería",
    description: "Reservá tu turno con el barbero que prefieras de manera online en segundos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}