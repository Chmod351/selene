"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import InfoBar from "@/components/Ui/InfoBar";
import data from "@/components/Common/data";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { GiShoppingCart } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import EcommerceContext from "@/store/store";
import userCart from "@/components/Ui/Cart";
//vars
const CartMobile = userCart.CartMobile;
const CartDesktop = userCart.CartDesktop;

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { cart } = useContext(EcommerceContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Puedes ajustar el valor 768 según tus necesidades
    };

    window.addEventListener("resize", handleResize);

    // Establecer el estado inicial cuando el componente se monta
    handleResize();

    // Limpiar el evento cuando el componente se desmonta
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
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

      <nav className="bg-primary w-full h-24 sticky top-0 font-helvetica  pb-8 ">
        <InfoBar />
        <div className="md:max-w-[1100px] w-11/12 mx-auto mb-10 flex justify-between items-center h-full">
          <div className="flex items-center">
            <Image src="/Imagen pegada.png" alt="logo" width={20} height={20} />
          </div>
          <div className="md:flex space-x-4  hidden">
            {data.map((item) => (
              <React.Fragment key={item.name}>
                <p className="cursor-pointer hover:underline">{item.name}</p>
              </React.Fragment>
            ))}
          </div>
          <div className="flex md:space-x-4 space-x-8 items-center">
            <form className="md:block px-4 py-2 rounded-3xl bg-white hidden">
              <input type="text" placeholder="Search" />
              <button>Search</button>
            </form>
            <button
              className="w-8 h-8  bg-red-400 md:hidden"
              onClick={
                isSearchOpen
                  ? () => setIsSearchOpen(false)
                  : () => setIsSearchOpen(true)
              }
            >
              Search
            </button>
            <div
              className="w-8 h-8  bg-gray-400 md:hidden"
              onClick={() => setIsNavbarOpen(true)}
            ></div>
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
        </div>
        <SlidingPane
          closeIcon={<div>X</div>}
          isOpen={isSearchOpen}
          title="What are you looking for?."
          onRequestClose={() => setIsSearchOpen(false)}
        >
          <form className="flex px-4 h-16 items-center rounded-3xl border-2 border-gray-300 justify-between">
            <input type="text" placeholder="Search" className="w-full" />
            <button>Search</button>
          </form>
        </SlidingPane>
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
    </>
  );
}

export default Navbar;
