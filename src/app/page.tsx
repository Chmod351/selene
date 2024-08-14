"use client";
import Navbar from "../components/common/Navbar";
import InfoBar from "../components/common/InfoBar";
import Footer from "../components/common/Footer";
import EcommerceProvider from "../components/store/EcommerceProvider";
import LandingCardContainer from "../components/ProductComponents/LandingCardContainer";
export default function Home() {
  return (
    <main className="">
      <EcommerceProvider>
        <Navbar />
        <LandingCardContainer />
        <Footer />
        <InfoBar />
      </EcommerceProvider>
    </main>
  );
}
