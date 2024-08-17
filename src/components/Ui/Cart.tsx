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
  return (
    <div className="flex flex-col gap-4 md:w-72 w-full m-auto">
      {cart.length !== 0 && <div onClick={clearCart}>Clear your Cart.</div>}
      {cart.length > 0 ? (
        cart.map((item) => (
          <article
            className="md:flex flex-col  my-8 mx-auto justify-between w-full hidden font-helvetica   h-[510px] "
            key={item._id}
          >
            <div
              className="absolute bg-white h-10 w-10 hover:bg-gray-200 hover:cursor-pointer text-center rounded-full text-2xl flex items-center justify-center"
              onClick={() => removeFromCart(item._id)}
            >
              <span className="text-center">X</span>
            </div>

            <div className="m-auto flex flex-col gap-4">
              <div className=" w-full overflow-hidden rounded-lg ">
                <img
                  className="w-full h-full object-cover"
                  src={item.image_url[0]}
                  alt={item.name_es}
                  // width={260}
                  // height={260}
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
                      {item.size}
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
