import React from "react";
import { Metadata } from "next";
import EcommerceProvider from "../store/EcommerceProvider";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import QueryClientProvider from "@/store/QueryProvider";
import { UrlProvider } from "@/store/UrlProvider";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lazy Trendy",
  description:
    "Nuestra colección abarcan desde piezas atrevidas hasta clásicos reinventados, ideales para crear un guardarropa versátil. Cada prenda es confeccionada con amor y atención al detalle. En nuestra tienda, celebramos la diversidad y la autoexpresión a través de diseños únicos y contemporáneos que resaltan tu individualidad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EcommerceProvider>
          <QueryClientProvider>
            <UrlProvider>
              <Navbar />
              {children}
              <Footer />
            </UrlProvider>
          </QueryClientProvider>
        </EcommerceProvider>
      </body>
    </html>
  );
}
