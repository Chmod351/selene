"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { useState } from "react";
import InfoBar from "@/components/Ui/InfoBar";
import data from "@/components/Common/data";
import { adminNavBar } from "@/components/Common/data";
import SlidingPane from "react-sliding-pane";
import NextLink from "next/link";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { GiShoppingCart } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import EcommerceContext from "@/store/store";
import SearchBar from "@/components/Ui/SearchBar";
import Cart from "@/components/Ui/Cart";
import useIsMobile from "@/hooks/useIsMobile";
import useAdmin from "@/hooks/useAdminHook";

const Navbar = React.memo(function Navbar() {
  const { isMobile } = useIsMobile();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useContext(EcommerceContext);
  const { isAdmin } = useAdmin();

  const addQueryToParams = (query: string) => {
    const urlParams = (document.location.href = `categories/?q=${query}`);
    return urlParams;
  };

  return (
    <div className="w-full fixed top-0 ">
      <InfoBar text="" />
      <nav>
        <Cart
          cart={cart}
          setIsCartOpen={setIsCartOpen}
          isCartOpen={isCartOpen}
          isMobile={isMobile}
        />
        <nav className="bg-primary w-full h-24 font-helvetica text-sm  shadow-lg">
          <div className="container w-11/12 mx-auto mb-10 flex justify-between items-center h-full">
            <div className="flex items-center w-[100px] h-[100px]">
              {isMobile ? (
                <Image
                  className="cursor-pointer"
                  src="/logo.png"
                  alt="logo"
                  width={300}
                  height={300}
                  layout="intrinsic"
                  style={{ width: "100%", height: "100%" }}
                  objectFit="full"
                  onClick={() => setIsNavbarOpen(!isNavbarOpen)}
                />
              ) : (
                <NextLink href={"/"}>
                  <Image
                    src="/logo.png"
                    alt="logo"
                    width={1000}
                    height={1000}
                    layout="intrinsic"
                    style={{ width: "100%", height: "100%" }}
                    objectFit="contain"
                  />
                </NextLink>
              )}
            </div>
            <div className="md:flex space-x-4  hidden">
              {!isAdmin &&
                data.map((item) => (
                  // we need to add its item.name as a query parameter
                  <React.Fragment key={item.name}>
                    <p
                      className="cursor-pointer hover:underline"
                      onClick={() => addQueryToParams(item.url)}
                    >
                      {item.name}
                    </p>
                  </React.Fragment>
                ))}
              {isAdmin &&
                adminNavBar.map((item) => (
                  // we need to add its item.name as a query parameter
                  <React.Fragment key={item.name}>
                    <NextLink
                      className="cursor-pointer hover:underline"
                      href={item.url}
                    >
                      {item.name}
                    </NextLink>
                  </React.Fragment>
                ))}
            </div>
            {!isAdmin && (
              <div className="flex space-x-4">
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
            )}
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
              <NextLink href={"/"}>
                <p
                  className="cursor-pointer hover:underline"
                  onClick={() => setIsNavbarOpen(false)}
                >
                  HOME
                </p>
              </NextLink>
              {data.map((item) => (
                <React.Fragment key={item.name}>
                  <p
                    className="cursor-pointer hover:underline"
                    onClick={() => setIsNavbarOpen(false)}
                  >
                    {item.name}
                  </p>
                </React.Fragment>
              ))}
            </div>
          </SlidingPane>
        </nav>
      </nav>
    </div>
  );
});

export default Navbar;
