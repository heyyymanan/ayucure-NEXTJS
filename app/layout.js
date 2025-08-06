import { Geist, Geist_Mono, Noto_Sans_Bassa_Vah } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar.jsx";
import Footer from "@/components/footer.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"


import ScrollToTop from "./functions/scrollToTop";
import FloatingCart from "@/components/ui/floating_cart";





const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export default function RootLayout({ children }) {
  return (
    
      <CartProvider >

          <html lang="en">
          <meta name="google-site-verification" content="OgqfdPeXzgaIRi6ZIyf8w4mvNBVxTdagT9SYP9TMeFc" />
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navbar />

            <ScrollToTop />

            {children}
            <Analytics />
            <SpeedInsights />
            <FloatingCart/>

            <Footer />
            
          </body>
        </html>

      </CartProvider>
   
  );
}
