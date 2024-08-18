"use client";
import Image from "next/image";
import SlidingPane from "react-sliding-pane";
import React, { useState } from "react";
import SelectedProductCard from "./SelectedProductCard";
import { IProduct } from "@/components/ProductComponents/types";
import useIsMobile from "@/hooks/useIsMobile";

function LandingCard({ product }: { product: IProduct }) {
  const isMobile = useIsMobile();
  const [isProductViewOpen, setIsProductViewOpen] = useState<boolean>(false);
  return (
    <>
      <article
        className="min-max-h-[420px] h-full p-1 overflow-hidden  w-[240px] flex flex-col justify-center font-helvetica m-auto hover:cursor-pointer hover:shadow-2xl gap-5"
        onClick={() => setIsProductViewOpen(true)}
      >
        <Image
          src={product.image_url[0]}
          alt={product.name_es}
          className="w-full h-[330px] object-cover rounded-lg"
          width="240"
          height="330"
          objectFit="cover"
        />
        <div className=" justify-left left-0 max-w-[240px]   w-full overflow-hidden">
          <div className="flex flex-col m-auto h-[60px] ">
            <strong className="text-3xl">${product.price_es}</strong>
            <p className="text-sm">{product.name_es}</p>
          </div>
        </div>
      </article>
      {isMobile ? (
        <SlidingPane
          className="z-40"
          closeIcon={<div>X</div>}
          isOpen={isProductViewOpen}
          title={product.name_es}
          width="95%"
          onRequestClose={() => setIsProductViewOpen(false)}
        >
          <SelectedProductCard
            productId={product._id}
            setIsProductViewOpen={setIsProductViewOpen}
          />
        </SlidingPane>
      ) : (
        <SlidingPane
          className="z-40"
          closeIcon={<div>X</div>}
          isOpen={isProductViewOpen}
          title={product.name_es}
          width="700px"
          onRequestClose={() => setIsProductViewOpen(false)}
        >
          <SelectedProductCard
            productId={product._id}
            setIsProductViewOpen={setIsProductViewOpen}
          />
        </SlidingPane>
      )}
    </>
  );
}

export default LandingCard;
