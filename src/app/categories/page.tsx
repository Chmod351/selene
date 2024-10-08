"use client";
import React from "react";
import { useIsQuerySearch } from "@/hooks/useIsQuerySearch";
import LandingCardLoading from "@/components/Ui/LandingCardLoading";
import ErrorScreen from "@/components/Ui/ErrorScreen";
import { IProduct } from "@/components/ProductComponents/types";
import LandingCard from "@/components/ProductComponents/LandingCard";

function Category() {
  let splitQfromUrl: string[] = [];
  if (typeof window !== "undefined") {
    const searchParams = window.location.search;
    splitQfromUrl = searchParams.split("?q=");
  }
  const { data, error, isLoading } = useIsQuerySearch(splitQfromUrl[1]);
  if (error) {
    return <ErrorScreen />;
  }
  // @ts-ignore
  if (data?.data?.length === 0) {
    return (
      <section className="w-full min-h-1/2 m-auto">
        <div className="w-full h-[300px] flex  flex-col items-center justify-center mx-auto mt-32 mb-10">
          <p className="text-3xl font-helvetica font-bold text-center m-auto">
            No se encontraron resultados :(
          </p>
        </div>
      </section>
    );
  }
  console.log(data);
  return (
    <section className="w-full mt-40  py-10 z-[0] ">
      <div className="w-full flex flex-row flex-wrap justify-center gap-5">
        {isLoading && !data
          ? [...Array(50)].map((_, index) => (
              <div key={index} className="item flex flex-row z-[-3]">
                <LandingCardLoading />
              </div>
            ))
          : // @ts-ignore
            data?.data?.map((product: IProduct) => (
              <div key={product._id}>
                <LandingCard product={product} />
              </div>
            ))}
      </div>
    </section>
  );
}

export default Category;
