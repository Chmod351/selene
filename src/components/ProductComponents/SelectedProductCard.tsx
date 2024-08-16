import React, { useContext } from "react";
import EcommerceContext from "@/store/store";
import SubmitButton from "../Ui/SubmitButton";
import Image from "next/image";

function SelectedProductCard({
  product,
  setIsProductViewOpen,
  selectedImage,
  setSelectedImage,
}: any) {
  const { addToCart, cart } = useContext(EcommerceContext);
  console.log(cart);
  const addToCartAndCloseModal = () => {
    console.log("added to cart");
    addToCart(product);
    setIsProductViewOpen(false);
  };
  return (
    <article className="flex md:flex-row w-full gap-4">
      <div className="m-auto">
        <div className="max-w-[460px] max-h-[360px] overflow-hidden rounded-lg mb-4">
          <Image
            src={product.image[selectedImage]}
            alt={product.name}
            width={460}
            height={360}
            objectFit="contain"
            className="hover cursor-pointer"
          />
        </div>

        <div className="flex flex-row max-w-[460px] gap-4 overflow-x-scroll">
          {product.image.map((image: string, index: number) => (
            <Image
              className="hover cursor-pointer"
              onClick={() => setSelectedImage(index)}
              key={index}
              src={product.image[index]}
              alt={product.name}
              width={80}
              height={80}
            />
          ))}
        </div>
      </div>
      <aside className="w-1/2 gap-4 flex flex-col h-[490px] bg-gray-100 px-4 rounded justify-start items-start left-0 m-auto">
        <h1 className="text-3xl font-bold">Producto</h1>
        <strong className="text-3xl"> {product.price}</strong>
        <div className="flex flex-row  gap-8 items-center max-w-[460px] wrap justify-between">
          <h2 className="font-semibold">Colores:</h2>
          {product.colors.map((color: string) => (
            <ul
              className="flex-row gap-1"
              key={color}
              style={{ listStyle: "none" }}
            >
              <li
                className="w-9 h-9 rounded-ful"
                style={{
                  backgroundColor: color,
                  border: "1px solid black",
                  borderRadius: "50%",
                }}
                key={color}
              ></li>
            </ul>
          ))}
        </div>
        <div className="flex flex-row  gap-8 items-center max-w-[460px] wrap">
          <h2 className="font-semibold">Talles:</h2>
          {product.size.map((size: string) => (
            <ul
              className="flex-row gap-8"
              key={size}
              style={{ listStyle: "none" }}
            >
              <li
                key={size}
                className="text-sm bg-white h-8 w-8 rounded-full flex items-center justify-center"
              >
                {size}
              </li>
            </ul>
          ))}
        </div>
        <SubmitButton
          label="Add to cart"
          onClick={addToCartAndCloseModal}
          disabled={false}
          type="button"
        />
        <p>{product.description}</p>
      </aside>
    </article>
  );
}

export default SelectedProductCard;
