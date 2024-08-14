import Image from "next/image";
import SlidingPane from "react-sliding-pane";
import React, { useState } from "react";
import SelectedProductCard from "./SelectedProductCard";

function LandingCard({ product }: any) {
  const [isProductViewOpen, setIsProductViewOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <>
      <article
        className="min-h-[412px] w-[260px] flex flex-col justify-center font-helvetica m-auto hover:cursor-pointer "
        onClick={() => setIsProductViewOpen(true)}
      >
        <Image
          src={product.image[selectedImage]}
          alt={product.name}
          width={260}
          height={412}
        />
        <div className="flex flex-col justify-left left-0 max-w-[260px] w-full overflow-hidden">
          <strong>{product.price}</strong>
          <p className="text-sm">{product.name}</p>
        </div>
      </article>
      <SlidingPane
        className="z-40"
        closeIcon={<div>X</div>}
        isOpen={isProductViewOpen}
        title={product.name}
        width="800px"
        onRequestClose={() => setIsProductViewOpen(false)}
      >
        <SelectedProductCard
          product={product}
          setIsProductViewOpen={setIsProductViewOpen}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </SlidingPane>
    </>
  );
}

export default LandingCard;
