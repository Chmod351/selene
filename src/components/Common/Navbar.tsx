"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import InfoBar from "@/components/Ui/InfoBar";
import data from "@/components/Common/data";
import SlidingPane from "react-sliding-pane";
import NextLink from "next/link";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { GiShoppingCart } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import EcommerceContext from "@/store/store";
import SearchBar from "@/components/Ui/SearchBar";
import userCart from "@/components/Ui/Cart";
import useIsMobile from "@/hooks/useIsMobile";
//vars
const CartMobile = userCart.CartMobile;
const CartDesktop = userCart.CartDesktop;

function Navbar() {
  const isMobile = useIsMobile();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useContext(EcommerceContext);

  return (
    <div className="w-full fixed top-0 ">
      <InfoBar />
      <nav>
        {isMobile ? (
          <CartMobile
            cart={cart}
            setIsCartOpen={setIsCartOpen}
            isCartOpen={isCartOpen}
          />
        ) : (
          <CartDesktop
            cart={cart}
            setIsCartOpen={setIsCartOpen}
            isCartOpen={isCartOpen}
          />
        )}

        <nav className="bg-primary w-full h-24 font-helvetica text-sm  shadow-lg">
          <div className="container w-11/12 mx-auto mb-10 flex justify-between items-center h-full">
            <div className="flex items-center">
              <NextLink href={"/"}>
                <Image
                  src="/Imagen pegada.png"
                  alt="logo"
                  width={20}
                  height={20}
                />
              </NextLink>
            </div>
            <div className="md:flex space-x-4  hidden">
              {data.map((item) => (
                <React.Fragment key={item.name}>
                  <p className="cursor-pointer hover:underline">{item.name}</p>
                </React.Fragment>
              ))}
            </div>
            <SearchBar />
            <div
              className="w-8 h-8 rounded-full  cursor-pointer"
              onClick={
                isCartOpen
                  ? () => setIsCartOpen(false)
                  : () => setIsCartOpen(true)
              }
            >
              {cart.length === 0 ? (
                <GiShoppingCart className="w-full h-full " />
              ) : (
                <>
                  <FaShoppingCart className="w-full h-full " />
                </>
              )}
            </div>
          </div>

          <SlidingPane
            closeIcon={<div>X</div>}
            isOpen={isNavbarOpen}
            title="Menu"
            from="left"
            width="90%"
            onRequestClose={() => setIsNavbarOpen(false)}
          >
            <div className="flex flex-col space-y-4 ">
              {data.map((item) => (
                <React.Fragment key={item.name}>
                  <p className="cursor-pointer hover:underline">{item.name}</p>
                </React.Fragment>
              ))}
            </div>
          </SlidingPane>
        </nav>
      </nav>
    </div>
  );
}

export default Navbar;
