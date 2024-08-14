import React from "react";

const MyLoader = (props) => (
  <article className="h-[412px] w-[260px]    cursor-pointer">
    <div className="bg-gray-400 animate-pulse h-[300px] w-full rounded-md" />
    <div className="bg-white  h-[20px] w-full" />
    <div className="bg-gray-600 animate-pulse h-[20px] w-[80px] rounded-md" />
    <div className="w-full bg-white h-[14px]" />
    <div className="bg-gray-400 animate-pulse h-[14px] w-full  rounded-md " />
    <div className="w-full bg-white h-[14px]" />
    <div className="bg-gray-400 animate-pulse h-[14px] w-full rounded-md" />
  </article>
);

export default MyLoader;
