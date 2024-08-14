"use client";
import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import InfoBar from "@/components/common/InfoBar";
import data from "@/components/common/data";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { GiShoppingCart } from "react-icons/gi";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <nav className="bg-primary w-full h-24 fixed top-0 font-helvetica z-[80] pb-8">
      <InfoBar />
      <div className="md:max-w-[1100px] w-11/12 mx-auto mb-10 flex justify-between items-center h-full">
        <div className="flex items-center">
          <Image src="/Imagen pegada.png" alt="logo" width={20} height={20} />
        </div>
        <div className="md:flex space-x-4  hidden">
          {data.map((item) => (
            <React.Fragment key={item.name}>
              <NextLink href={item.url}>{item.name}</NextLink>
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
            <GiShoppingCart className="w-full h-full" />
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
        title="Welcome to LazyTrending"
        from="left"
        width="90%"
        onRequestClose={() => setIsNavbarOpen(false)}
      >
        <div className="flex flex-col space-y-4 ">
          {data.map((item) => (
            <React.Fragment key={item.name}>
              <NextLink href={item.url}>{item.name}</NextLink>
            </React.Fragment>
          ))}
        </div>
      </SlidingPane>
      <SlidingPane
        closeIcon={<div>X</div>}
        isOpen={isCartOpen}
        title="This is your Cart."
        width="800px"
        onRequestClose={() => setIsCartOpen(false)}
      ></SlidingPane>
    </nav>
  );
}

export default Navbar;
