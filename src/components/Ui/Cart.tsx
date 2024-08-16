import React from "react";
import SlidingPane from "react-sliding-pane";
import SubmitButton from "@/components/Ui/SubmitButton";
import Image from "next/image";
import NextLink from "next/link";

function CartLogic({ cart, setIsCartOpen }) {
  return (
    <>
      {cart.map((item) => (
        <article
          className="md:flex flex-col gap-4 m-auto justify-center  w-full hidden"
          key={item.id}
        >
          <div className="m-auto flex flex-col gap-4 p-4">
            <div className=" h-[260px] max-w-[460px] w-full overflow-hidden rounded-lg ">
              <Image
                className=""
                src={item.image[0]}
                alt={item.name}
                width={260}
                height={260}
              />
            </div>
            <strong className="text-2xl max-w-[260px] overflow-hidden">
              {item.name}
            </strong>
            <strong className="text 3xl">{item.price}</strong>
            <strong className="text 3xl">{item.color}</strong>
            <strong className="text 3xl">{item.size}</strong>
            <strong className="text 3xl">Quantity: {item.quantity}</strong>
          </div>
        </article>
      ))}
      <NextLink href="/checkout">
        <SubmitButton
          label="Checkout"
          onClick={() => setIsCartOpen(false)}
          type="submit"
          disabled={false}
        />
      </NextLink>
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
