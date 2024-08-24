import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import LandingCard from "./LandingCard";
import LandingCardLoading from "@/components/Ui/LandingCardLoading";
import ErrorScreen from "@/components/Ui/ErrorScreen";
import { IProduct } from "@/components/ProductComponents/types";

const api_url = "http://localhost:4000/api/v1";

const fetchProductsFromApi = async ({
  currentPage,
}: {
  currentPage: number;
}) => {
  const response = await fetch(`${api_url}/products?page=${currentPage}`);
  if (!response.ok) {
    throw new Error("Error fetching products");
  }
  const data = await response.json();
  return data;
};

export default function LandingCardContainer() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newArr, setNewArr] = useState<IProduct[] | []>([]);
  const {
    isLoading: isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => fetchProductsFromApi({ currentPage }),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data && !isLoading) {
      setNewArr((prevArr) => [...prevArr, ...data.data]);
    }
  }, [data, isLoading]);

  const goToNextPage = () => {
    if (currentPage < data?.totalPages && !isLoading) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <section className="w-full  py-10 z-[0] ">
      <div className="container w-11/12 m-auto">
        <h1 className="text-3xl font-bold font-helvetica mb-10 text-center md:text-left">
          COLECCIÓN 2024
        </h1>
        <div className="w-full flex flex-row flex-wrap justify-center gap-5">
          {isLoading && currentPage === 1 && !data
            ? [...Array(50)].map((_, index) => (
                <div key={index} className="item flex flex-row z-[-3]">
                  <LandingCardLoading />
                </div>
              ))
            : newArr.map((product: IProduct) => (
                <div key={product._id}>
                  <LandingCard product={product} />
                </div>
              ))}
        </div>
        <div className="w-full flex flex-row flex-wrap justify-center gap-5">
          {" "}
          {isLoading &&
            currentPage > 1 &&
            [...Array(50)].map((_, index) => (
              <div key={index} className="item flex flex-row z-[-3]">
                <LandingCardLoading />
              </div>
            ))}
        </div>

        {isLoading ? (
          <div className="bg-gray-300 animate-pulse h-10 w-11/12 rounded-lg items-center justify-center m-auto" />
        ) : (
          newArr.length < data?.totalItems && (
            <div className="flex flex-col items-center my-10 ">
              <span className="text-gray-400">
                {newArr.length} of {data?.totalItems} products
              </span>

              <button onClick={goToNextPage} className="mt-4">
                Ver los siguientes productos
              </button>
            </div>
          )
        )}
      </div>
    </section>
  );
}
