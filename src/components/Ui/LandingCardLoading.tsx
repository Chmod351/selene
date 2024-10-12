import React from "react";
const LandingCardLoading = React.memo(function LandingCardLoading() {
  return (
    <article className="h-[420px] w-[240px] cursor-pointer">
      <div className="bg-gray-400 animate-pulse h-[330px] w-full rounded-md flex items-center justify-center">
        <span className="text-center">Loading...</span>
      </div>
      <div className="bg-white h-[20px] w-full" />
      <div className="bg-gray-600 animate-pulse h-[20px] w-[80px] rounded-md" />
      <div className="w-full bg-white h-[14px]" />
      <div className="bg-gray-400 animate-pulse h-[14px] w-full rounded-md" />
      <div className="w-full bg-white h-[4px]" />
      <div className="bg-gray-400 animate-pulse h-[14px] w-1/2 rounded-md" />
    </article>
  );
});
export default LandingCardLoading;
