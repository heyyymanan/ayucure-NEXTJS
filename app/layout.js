import { Geist, Geist_Mono, Noto_Sans_Bassa_Vah } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"; 
import { CartProvider } from "./context/CartContext";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BynaTablet.in",
  description: "site to buy ayurvedic medicines",
};

export default function RootLayout({ children }) {
  return (
    <CartProvider >

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Navbar />
        {children}
      <Footer/>
      <Toaster richColors closeButton expand={true} />
      </body>
    </html>
        </CartProvider>
  );
}
