import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import data from "@/components/common/data";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import { BsBank2 } from "react-icons/bs";

function Footer() {
  return (
    <footer className="bg-primary w-full  font-helvetica md:h-[406px] md:py-0 pt-10">
      <div className="md:max-w-[1100px] w-11/12 m-auto flex md:justify-between items-center h-full space-x-4 md:flex-row flex-col-reverse  ">
        <div className="w-[300px] h-[300px] bg-gray-400 md:p-0 my-10">
          imagen
        </div>
        <ul className="flex flex-col space-y-4">
          {data.map((item) => (
            <li key={item.name} className="m-auto md:m-0">
              <NextLink href={item.url}>{item.name}</NextLink>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col space-y-4 ">
          {data.map((item) => (
            <li key={item.name} className="m-auto md:m-0">
              <NextLink href={item.url}>{item.name}</NextLink>
            </li>
          ))}
          <div className="flex md:space-x-4 space-x-8 items-center">
            <div className="w-8 h-8 ">
              <SiMercadopago className="w-full h-full" />
            </div>
            <div className="w-8 h-8 ">
              <BsBank2 className="w-full h-full" />
            </div>
          </div>
        </ul>
        <div className="flex flex-col w-[300px]">
          <div className="flex row md:space-x-4 space-x-8 py-2 md:justify-end justify-center">
            <div className="w-8 h-8 ">
              <FaTiktok className="w-full h-full" />
            </div>
            <div className="w-8 h-8 ">
              <FaInstagram className="w-full h-full" />
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum
            dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
            ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
