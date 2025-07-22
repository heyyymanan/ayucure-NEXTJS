import Home from "./home";
export const metadata = {
  title: "BynaTablet.in - Buy Ayurvedic Medicine Online",
  description: "Buy Trusted Ayurvedic Medicines Online At Wholesale Price.",
  keywords: ["ayurvedic medicine", "buy ayurvedic medicine", "herbal tablets","herbal medicine","natural medicine", "byna tablet", "natural treatment","shreeji remedies","byna oil","byna capsule","joint pain medicine","joint pain ayurvedic medicine","muscle pain medicine","muscle pain ayurvedic medicine"],
  metadataBase: new URL("https://bynatablet.in"),
  openGraph: {
    title: "BynaTablet.in - Buy Ayurvedic Medicine Online",
    description: "Your one-stop destination for trusted Ayurvedic and herbal remedies.",
    url: "https://bynatablet.in",
    siteName: "BynaTablet.in",
    images: [
      {
        url: "https://bynatablet.in/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "BynaTablet.in Banner",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
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

export default function LandingPage() {
  

  return (
    <Home/>
  );
}
