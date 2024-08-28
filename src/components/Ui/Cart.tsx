import React, { useContext } from "react";
import SlidingPane from "react-sliding-pane";
import SubmitButton from "@/components/Ui/SubmitButton";
import Image from "next/image";
import NextLink from "next/link";

import EcommerceContext from "@/store/store";

import { ICartProps, ICart } from "@/components/Ui/types";

function CartLogic({ cart, setIsCartOpen }: ICartProps) {
  const { removeFromCart, clearCart } = useContext(EcommerceContext);

  return (
    <div className="flex flex-col gap-4 md:w-72 w-full m-auto">
      {cart.length !== 0 && <div onClick={clearCart}>Clear your Cart.</div>}
      {cart.length > 0 ? (
        cart.map((item) => (
          <article
            className="md:flex flex-col  my-8 mx-auto justify-between w-full  font-helvetica   h-[510px] "
            key={item._id + item.color}
          >
            <div
              className="absolute bg-black text-white h-9 w-9 hover:bg-gray-900 hover:cursor-pointer text-center rounded-full  flex items-center justify-center"
              onClick={() => removeFromCart(item._id + item.color)}
            >
              <span className="text-center mt-1">X</span>
            </div>

            <div className="m-auto flex flex-col gap-4">
              <div className=" w-full overflow-hidden rounded-lg ">
                <Image
                  className="w-full h-full object-cover"
                  src={item.image_url[0]}
                  alt={item.name_es}
                  width={260}
                  height={260}
                />
              </div>
              <div className="flex flex-col gap-4">
                <strong className="text-2xl max-w-full overflow-hidden">
                  {item.name_es}
                </strong>
                <strong className="text-3xl"> ${item.price_es}</strong>
                <div className="flex flex-row justify-between items-center">
                  <h2 className="font-semibold ">Color:</h2>
                  <ul className="flex-row " style={{ listStyle: "none" }}>
                    <li
                      className="w-9 h-9 hover:cursor-pointer"
                      style={{
                        backgroundColor: item.color,
                        border: `3px solid ${item.color}`,
                        borderRadius: "50%",
                      }}
                    ></li>
                  </ul>
                </div>
                <div className="flex flex-row justify-between items-center ">
                  <h2 className="font-semibold ">Talle:</h2>
                  <ul className="flex-row gap-1" style={{ listStyle: "none" }}>
                    <li className="text-sm bg-gray-300 font-semibold hover:bg-gray-400 hover:cursor-pointer h-9 w-9 rounded-full flex items-center justify-center">
                      <span className="text-center mt-1"> {item.size}</span>
                    </li>
                  </ul>
                </div>
                <strong className="text 3xl">Quantity: {item.quantity}</strong>
              </div>
            </div>
          </article>
        ))
      ) : (
        <div className="m-auto flex justify-center h-full w-full  item-center">
          Cart is Empty
        </div>
      )}
      <aside className="w-full flex flex-col justify-center bg-primary"></aside>
      {cart.length > 0 && (
        <NextLink href="/checkout">
          <SubmitButton
            label="Checkout"
            onClick={() => setIsCartOpen(false)}
            type="submit"
            disabled={false}
          />
        </NextLink>
      )}
    </div>
  );
}

function Cart({ cart, setIsCartOpen, isCartOpen, isMobile }: ICart) {
  return (
    <SlidingPane
      className="z-40"
      closeIcon={<div>X</div>}
      isOpen={isCartOpen}
      title="This is your Cart."
      width={isMobile ? "100%" : "700px"}
      onRequestClose={() => setIsCartOpen(false)}
    >
      <CartLogic cart={cart} setIsCartOpen={setIsCartOpen} />
    </SlidingPane>
  );
}

export default Cart;
