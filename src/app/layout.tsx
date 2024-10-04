import React from "react";
import { Metadata } from "next";
import EcommerceProvider from "../store/EcommerceProvider";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import QueryClientProvider from "@/store/QueryProvider";
import { UrlProvider } from "@/store/UrlProvider";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lazy Trendy",
  description:
    "Nuestra colección abarcan desde piezas atrevidas hasta clásicos reinventados, ideales para crear un guardarropa versátil. Cada prenda es confeccionada con amor y atención al detalle. En nuestra tienda, celebramos la diversidad y la autoexpresión a través de diseños únicos y contemporáneos que resaltan tu individualidad",
  metadataBase: new URL("https://www.lazytrendy.ca/"),
  openGraph: {
    title: "Lazy Trendy",
    description:
      "Nuestra colección abarcan desde piezas atrevidas hasta clásicos reinventados, ideales para crear un guardarropa versátil. Cada prenda es confeccionada con amor y atención al detalle. En nuestra tienda, celebramos la diversidad y la autoexpresión a través de diseños únicos y contemporáneos que resaltan tu individualidad",
    url: "https://www.lazytrendy.ca/",
    siteName: "Lazy Trendy",
    images: [
      {
        url: "https://instagram.faep6-2.fna.fbcdn.net/v/t51.29350-15/461897712_517533224558186_4418515626802564167_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDE1eDc0OS5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.faep6-2.fna.fbcdn.net&_nc_cat=102&_nc_ohc=aJbWUn-256EQ7kNvgEzD2Rs&_nc_gid=8fb161b3c7ef4996a6896645f1ef098d&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzQ2OTU4MTUwNzM5ODIyMDI5Ng%3D%3D.3-ccb7-5&oh=00_AYALXuHdTN8mnaxPd4rrE8wF1QEwAbyeloYRypfAhuYVdw&oe=67039DB6&_nc_sid=7a9f4b", // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link href="/logo.png" rel="icon" />
        <link href="/logo.png" rel="apple-touch-icon" />
      </Head>
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
