"use client";
import { useEffect, useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import SlidingPane from "react-sliding-pane";
import LandingCardContainer from "@/components/ProductComponents/LandingCardContainer";
import SelectedProductCard from "@/components/ProductComponents/SelectedProductCard";
import { useUrl } from "@/store/UrlProvider";
export default function Home() {
  const { isMobile, isModalOpen, setIsModalOpen } = useIsMobile();
  const [productId, setProductId] = useState<string | null>(null);
  const { url, setUrl } = useUrl();

  useEffect(() => {
    setProductId(url.split("=")[1]);
    setIsModalOpen(true);
  }, [url, setIsModalOpen, setUrl]);

  const handleCloseModalAndClearUrlId = () => {
    setProductId(null);
    setIsModalOpen(false);
    setUrl("");
    window.history.pushState({}, "", "/");
  };
  return (
    <main className="mt-32">
      <LandingCardContainer />
      {productId && (
        <SlidingPane
          className="z-40"
          closeIcon={<div>X</div>}
          isOpen={isModalOpen}
          width={isMobile ? "95%" : "700px"}
          onRequestClose={handleCloseModalAndClearUrlId}
        >
          <SelectedProductCard
            productId={productId}
            setIsProductViewOpen={setIsModalOpen}
          />
        </SlidingPane>
      )}
    </main>
  );
}
