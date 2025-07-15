import { Geist, Geist_Mono, Noto_Sans_Bassa_Vah } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar.jsx";
import Footer from "@/components/footer.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Toaster } from "@/components/ui/sonner.jsx"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"


import {
  ClerkProvider,

} from '@clerk/nextjs'
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

export const metadata = {
  title: "BynaTablet.in | Ayurvedic Medicine Online",
  description: "Buy trusted Ayurvedic medicines online at BynaTablet.in. Quality herbal solutions for your wellness needs, delivered across India.",
  keywords: ["Ayurvedic medicine", "buy ayurveda online", "herbal tablets", "Byna Tablet", "natural treatment"],
  metadataBase: new URL("https://bynatablet.in"), // <-- use your actual domain
  openGraph: {
    title: "BynaTablet.in | Ayurvedic Medicine Online",
    description: "Your one-stop destination for trusted Ayurvedic and herbal remedies.",
    url: "https://bynatablet.in",
    siteName: "BynaTablet.in",
    images: [
      {
        url: "https://bynatablet.in/og-image.jpg", // make sure this exists
        width: 1200,
        height: 630,
        alt: "BynaTablet.in Banner",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
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
            <Toaster richColors closeButton expand={false} />
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
