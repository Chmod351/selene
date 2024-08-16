import Image from "next/image";
import SlidingPane from "react-sliding-pane";
import React, { useState } from "react";
import SelectedProductCard from "./SelectedProductCard";
import { IProduct } from "@/components/ProductComponents/types";

function LandingCard({ product }: { product: IProduct }) {
  const [isProductViewOpen, setIsProductViewOpen] = useState<boolean>(false);
  console.log(product);
  return (
    <>
      <article
        className="min-max-h-[400px] overflow-hidden py-4 px-2 w-[260px] flex flex-col justify-center font-helvetica m-auto hover:cursor-pointer hover:shadow-2xl "
        onClick={() => setIsProductViewOpen(true)}
      >
        <img
          src={product.image_url[0]}
          alt={product.name_es}
          className="w-full h-[260px] object-cover rounded-lg"
        />
        <div className="flex flex-col justify-left left-0 max-w-[260px] w-full overflow-hidden">
          <strong>${product.price_es}</strong>
          <p className="text-sm">{product.name_es}</p>
        </div>
      </article>
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
    </>
  );
}

export default LandingCard;
