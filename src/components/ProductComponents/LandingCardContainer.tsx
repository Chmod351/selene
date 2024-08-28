import LandingCard from "./LandingCard";
import LandingCardLoading from "@/components/Ui/LandingCardLoading";
import ErrorScreen from "@/components/Ui/ErrorScreen";
import { IProduct } from "@/components/ProductComponents/types";
import usePagination from "@/hooks/usePagination";

export default function LandingCardContainer() {
  const { currentPage, goToNextPage, products, error, isLoading, data } =
    usePagination();

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
            : products.map((product: IProduct) => (
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
          products.length < data?.totalItems && (
            <div className="flex flex-col items-center my-10 ">
              <span className="text-gray-400 font-helvetica">
                {products.length} of {data?.totalItems} products
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
