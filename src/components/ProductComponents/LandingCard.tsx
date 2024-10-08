"use client";
import { useState } from "react";
import Image from "next/image";
import SlidingPane from "react-sliding-pane";
import React from "react";
import SelectedProductCard from "./SelectedProductCard";
import { IProduct } from "@/components/ProductComponents/types";
import useIsMobile from "@/hooks/useIsMobile";

const LandingCard = React.memo(function LandingCard({
  product,
}: {
  product: IProduct;
}) {
  const { isMobile, isModalOpen, setIsModalOpen } = useIsMobile();
  const [imageSelected, setImageSelected] = useState<number>(0);

  const handleChangeImageOfProductsOnHover = () => {
    setImageSelected((imageSelected + 1) % product.image_url.length);
  };

  return (
    <>
      <article
        className="min-max-h-[420px] h-full p-2 overflow-hidden  w-[240px] flex flex-col justify-center font-helvetica m-auto hover:cursor-pointer  gap-4"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={product.image_url[imageSelected]}
          alt={product.name_es}
          className="w-full h-[330px] object-cover rounded-lg"
          width="240"
          height="330"
          objectFit="cover"
          onMouseOver={handleChangeImageOfProductsOnHover}
          onMouseOut={() => setImageSelected(0)}
        />
        <div className=" justify-left left-0 max-w-[240px]   w-full overflow-hidden">
          <div className="flex flex-col m-auto h-[60px] ">
            <strong className="text-3xl">${product.price_es}</strong>
            <p className="text-sm">{product.name_es}</p>
          </div>
        </div>
      </article>
      <SlidingPane
        className="z-40"
        closeIcon={<div>X</div>}
        isOpen={isModalOpen}
        width={isMobile ? "95%" : "700px"}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <SelectedProductCard
          productId={product._id}
          setIsProductViewOpen={setIsModalOpen}
        />
      </SlidingPane>
    </>
  );
});

export default LandingCard;
