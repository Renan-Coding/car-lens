import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals-clean.css";
import Navbar from "@/components/Navbar";
import AIFloatingButton from "@/components/AIFloatingButton";
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter' 
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "CarLens - Encontre seu próximo carro dos sonhos",
  description: "Descubra o veículo perfeito com nossa busca inteligente. Compare preços, modelos e encontre as melhores ofertas de carros no Brasil.",
  keywords: "carros, veículos, comprar carro, venda de carros, carros usados, carros novos",
  icons: {
    icon: '/carlens_logo.png',
    shortcut: '/carlens_logo.png',
    apple: '/carlens_logo.png',
  },
  openGraph: {
    title: "CarLens - Seu próximo carro está aqui",
    description: "Plataforma inteligente para encontrar o carro ideal",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/carlens_logo.png" type="image/png" />
        <link rel="shortcut icon" href="/carlens_logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/carlens_logo.png" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} text-white antialiased`}>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <AIFloatingButton />
      </body>
    </html>
  );
}