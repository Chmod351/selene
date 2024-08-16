import React, { useContext } from "react";
import SlidingPane from "react-sliding-pane";
import SubmitButton from "@/components/Ui/SubmitButton";
import Image from "next/image";
import NextLink from "next/link";
import { IProduct } from "@/components/ProductComponents/types";
import EcommerceContext from "@/store/store";

interface ICartProduct extends IProduct {
  color: string;
  size: string;
  quantity: number;
}

interface ICartProps {
  cart: ICartProduct[];
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CartLogic({ cart, setIsCartOpen }: ICartProps) {
  const { removeFromCart, clearCart } = useContext(EcommerceContext);
  console.log(cart);
  return (
    <>
      {cart.length !== 0 && <div onClick={clearCart}>XXX</div>}
      {cart.length > 0 ? (
        cart.map((item) => (
          <article
            className="md:flex flex-col gap-4 m-auto justify-center  w-full hidden"
            key={item._id}
          >
            <div onClick={() => removeFromCart(item._id)}>X</div>
            <div className="m-auto flex flex-col gap-4 p-4">
              <div className=" h-[260px] max-w-[460px] w-full overflow-hidden rounded-lg ">
                <img
                  className="w-full h-full object-cover"
                  src={item.image_url[0]}
                  alt={item.name_es}
                  // width={260}
                  // height={260}
                />
              </div>
              <strong className="text-2xl max-w-[260px] overflow-hidden">
                {item.name_es}
              </strong>
              <strong className="text 3xl"> ${item.price_es}</strong>
              <div className="flex flex-row justify-between my-4">
                <h2 className="font-semibold ">Color:</h2>
                <ul className="flex-row gap-1" style={{ listStyle: "none" }}>
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
              <div className="flex flex-row justify-between my-4">
                <h2 className="font-semibold ">Talle:</h2>
                <ul className="flex-row gap-1" style={{ listStyle: "none" }}>
                  <li className="text-sm bg-gray-300 font-semibold hover:bg-gray-400 hover:cursor-pointer h-9 w-9 rounded-full flex items-center justify-center">
                    {item.size}
                  </li>
                </ul>
              </div>
              <strong className="text 3xl">Quantity: {item.quantity}</strong>
            </div>
          </article>
        ))
      ) : (
        <div className="m-auto flex justify-center h-full w-full font-helvetica item-center">
          Cart is Empty
        </div>
      )}
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
    </>
  );
}

function CartDesktop({ cart, setIsCartOpen, isCartOpen }: any) {
  return (
    <SlidingPane
      className="custom-class"
      closeIcon={<div>X</div>}
      isOpen={isCartOpen}
      title="This is your Cart."
      width="700px"
      onRequestClose={() => setIsCartOpen(false)}
    >
      <CartLogic cart={cart} setIsCartOpen={setIsCartOpen} />
    </SlidingPane>
  );
}

function CartMobile({ cart, setIsCartOpen, isCartOpen }: any) {
  return (
    <SlidingPane
      className="z-40"
      closeIcon={<div>X</div>}
      isOpen={isCartOpen}
      title="This is your Cart."
      width=""
      onRequestClose={() => setIsCartOpen(false)}
    >
      <CartLogic cart={cart} setIsCartOpen={setIsCartOpen} />
    </SlidingPane>
  );
}

const userCart = {
  CartMobile,
  CartDesktop,
};
export default userCart;
