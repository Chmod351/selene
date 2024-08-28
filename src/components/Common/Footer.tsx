import React from "react";
import NextLink from "next/link";
import data, { data2 } from "@/components/Common/data";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import { BsBank2 } from "react-icons/bs";
import InfoBar from "@/components/Ui/InfoBar";

const calculateYear = new Date().getFullYear();

export default function Footer() {
  return (
    <>
      <footer className="bg-primary w-full  font-helvetica md:h-[406px] md:py-0 pt-10 ">
        <div className="md:container w-11/12 m-auto flex  items-center  h-full ">
          <div className="space-x-4 md:flex-row flex-col-reverse flex md:justify-between m-auto w-full md:h-56">
            <div className="md:w-[300px] h-[220px] bg-gray-400 animate-pulse rounded-lg md:p-0 md:my-0 my-8"></div>
            <ul className="flex flex-col space-y-4 my-8 md:my-0">
              {data.map((item) => (
                <li key={item.name} className="m-auto md:m-0">
                  <NextLink href={item.url}>{item.name}</NextLink>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col space-y-4 my-8 md:my-0">
              {data2.map((item) => (
                <li key={item.name} className="m-auto md:m-0">
                  <NextLink href={item.url}>{item.name}</NextLink>
                </li>
              ))}
              <div className="flex md:space-x-4 space-x-8 items-center m-auto md:m-0">
                <div className="w-8 h-8 ">
                  <SiMercadopago className="w-full h-full" />
                </div>
                <div className="w-8 h-8 ">
                  <BsBank2 className="w-full h-full" />
                </div>
              </div>
            </ul>
            <div className="flex flex-col md:w-[300px] gap-4 md:gap-0">
              <div className="flex row md:space-x-4 space-x-8 py-2 md:justify-end justify-center ">
                <a
                  className="w-8 h-8 "
                  target="_blank"
                  href="https://www.tiktok.com/@lazy.trendy?_t=8p5jFM9zbLq"
                >
                  <FaTiktok className="w-full h-full" />
                </a>
                <a
                  className="w-8 h-8 "
                  href="https://www.instagram.com/lazytrendy_"
                  target="_blank"
                >
                  <FaInstagram className="w-full h-full" />
                </a>
              </div>
              <p className="text-center md:text-left text-sm">
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum
                dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
                ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem
                ipsum
              </p>
            </div>
          </div>
        </div>
      </footer>
      <InfoBar text={`© ${calculateYear}. Todos los derechos reservados`} />
    </>
  );
}
