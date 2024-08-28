import React from "react";

function InfoBar({ text }: { text: string }) {
  return (
    <div className="w-full h-6 bg-black flex justify-center items-center ">
      <p className="text-white text-sm font-helvetica">{text}</p>
    </div>
  );
}

export default InfoBar;
