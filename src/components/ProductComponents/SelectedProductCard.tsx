import React, { useContext, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import EcommerceContext from "@/store/store";
import SubmitButton from "../Ui/SubmitButton";

import {
  IProduct,
  Sizes,
  SelectedProductCardProps,
} from "@/components/ProductComponents/types";

const fetchProductFromApi = async (productId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API}/products/id/${productId}`,
    );
    if (!response.ok) {
      throw new Error("Error fetching products");
    }
    const data: IProduct = await response.json();
    if (data) {
      return data;
    }
  } catch (e) {
    /* handle error */
    console.log(e);
  }
};

function SelectedProductCard({
  productId,
  setIsProductViewOpen,
}: SelectedProductCardProps) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProductFromApi(productId),
    refetchOnWindowFocus: false,
  });
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<Sizes | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isProductAvaliable, setIsProductAvaliable] = useState<
    boolean | undefined
  >(true);

  const { addToCart } = useContext(EcommerceContext);
  const addToCartAndCloseModal = () => {
    addToCart({ ...data, color: selectedColor, size: selectedSize });
    setIsProductViewOpen(false);
  };

  const allColors = Array.from(
    new Set(data?.stock.flatMap((stockItem) => stockItem.color) || []),
  );

  const allSizes = Array.from(
    new Set(data?.stock.flatMap((stockItem) => stockItem.size) || []),
  );

  const isCombinationAvailable = useCallback(
    (color: string, size: Sizes) => {
      return data?.stock.some(
        (stockItem) =>
          stockItem.color.includes(color) &&
          stockItem.size.includes(size) &&
          stockItem.quantity > 0,
      );
    },
    [data?.stock],
  );

  useEffect(() => {
    if (selectedSize && selectedColor) {
      const isAvaliable = isCombinationAvailable(selectedColor, selectedSize);
      setIsProductAvaliable(isAvaliable);
    }
  }, [selectedColor, selectedSize, isCombinationAvailable]);

  if (isLoading && !data) {
    return (
      <div className="max-w-[460px] m-auto ">
        <div className="max-w-[460px] h-96 bg-gray-300 animate-pulse flex flex-col m-auto">
          <p className="m-auto">Loading...</p>
        </div>
        <div className="max-w-[460px] h-24 bg-gray-300 animate-pulse flex flex-row mx-auto mt-4">
          <div className="m-auto">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <p className="text-center">Error</p>;
  }

  return (
    <div className="flex md:flex-row md:w-full gap-4 md:container w-full  m-auto">
      <div className="md:w-full w-full flex-col justify-between h-full m-auto md:max-w-[460px] p-4 rounded-md">
        <div className="m-auto h-full  max-h-[490px] ">
          <article className="w-full md:max-h-[360px] overflow-hidden rounded-lg mb-4">
            {!data?.image_url ? (
              <div className="max-w-[460px] h-96 bg-gray-300 animate-pulse flex flex-col m-auto">
                <p className="m-auto">Loading...</p>
              </div>
            ) : (
              <Image
                src={data?.image_url[selectedImage] || ""}
                alt={data?.name_es || "product"}
                className="hover cursor-pointer object-cover rounded-lg w-full md:h-[360px]"
                width={490}
                height={360}
                objectFit="responsive"
              />
            )}
          </article>
          <div className="flex flex-row max-w-full gap-4 overflow-x-auto">
            {data?.image_url.map((image: string, index: number) => (
              <article
                key={index}
                className="w-[100px] h-[100px] flex-shrink-0 rounded-lg"
                style={{
                  border:
                    selectedImage === index
                      ? "3px solid black"
                      : "3px solid transparent",
                }}
              >
                <Image
                  className="hover cursor-pointer h-full w-full object-cover rounded-lg"
                  onClick={() => setSelectedImage(index)}
                  key={index}
                  src={image}
                  alt={data?.name_es}
                  width={100}
                  height={100}
                />
              </article>
            ))}
          </div>
        </div>
        <aside className="w-full gap-4 flex flex-col  mt-12 rounded justify-start items-start left-0 m-auto">
          <h1 className="text-3xl font-bold">{data?.name_es}</h1>
          <strong className="text-3xl">$ {data?.price_es}</strong>
          {/* Mostrar colores y talles */}
          <div className="w-full">
            <div className="flex flex-row justify-between my-4 h-9 items-center">
              <h2 className="font-semibold">Colores:</h2>
              <div className="flex flex-row items-center max-w-full md:max-w-[460px] gap-1 wrap">
                {allColors.map((color: string) => (
                  <ul
                    className="flex-row gap-1"
                    key={color}
                    style={{ listStyle: "none" }}
                  >
                    <li
                      onClick={() => setSelectedColor(color)}
                      className="w-9 h-9 hover:cursor-pointer"
                      style={{
                        backgroundColor: color,
                        border:
                          selectedColor !== color
                            ? color === "white"
                              ? "3px solid black"
                              : `3px solid ${color}`
                            : "3px solid orange",
                        borderRadius: "50%",
                      }}
                    ></li>
                  </ul>
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between my-4 h-9 items-center">
              <h2 className="font-semibold">Talles:</h2>
              <div className="flex flex-row items-center max-w-full md:max-w-[460px] gap-1 wrap h-9 ">
                {allSizes.map((size) => (
                  <ul
                    className="flex flex-row "
                    key={size}
                    style={{ listStyle: "none" }}
                  >
                    <li
                      className="w-9 h-9 hover:cursor-pointer hover:bg-gray-400 rounded-full font-semibold text-sm"
                      style={{
                        border:
                          selectedSize === size
                            ? "3px solid black"
                            : "3px solid transparent",
                      }}
                      onClick={() => setSelectedSize(size)}
                    >
                      <span className="w-full h-full flex justify-center items-center">
                        {size}
                      </span>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>{" "}
          {!isProductAvaliable && (
            <span className="text-red-500">
              No nos quedan unidades disponibles :(
            </span>
          )}
          <div className=" w-full">
            <SubmitButton
              label="ADD TO CART"
              onClick={addToCartAndCloseModal}
              disabled={
                isProductAvaliable && selectedColor && selectedSize
                  ? false
                  : true
              }
              type="button"
            />
          </div>
          <p>{data?.description_es}</p>
        </aside>
      </div>
    </div>
  );
}

export default SelectedProductCard;
