import { Kode_Mono } from "next/font/google";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

import "./globals.css";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";

const kodeMono = Kode_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kode-mono",
});

export const metadata = {
  title: "Edukhan Store",
  description:
    "Loja Oficial do Projeto Edukhan | Compre camisetas, canecas e itens exclusivos que financiam o resgate escolar de crianças. Cada compra garante transporte seguro, materiais didáticos e esperança para quem mais precisa. Sua solidariedade vestida no dia a dia!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={kodeMono.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
