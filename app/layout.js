import { Geist, Geist_Mono, Noto_Sans_Bassa_Vah } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar.jsx";
import Footer from "@/components/footer.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Toaster } from "@/components/ui/sonner.jsx"


import {
  ClerkProvider,

} from '@clerk/nextjs'
import ScrollToTop from "./functions/scrollToTop";





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
    <ClerkProvider>
      <CartProvider >


        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navbar />

            <ScrollToTop />

            {children}

            <Footer />
            <Toaster richColors closeButton expand={false} />
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
