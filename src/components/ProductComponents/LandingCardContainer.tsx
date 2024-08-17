import { useQuery } from "@tanstack/react-query";
import LandingCard from "./LandingCard";
import LandingCardLoading from "@/components/Ui/LandingCardLoading";
import ErrorScreen from "@/components/Ui/ErrorScreen";
import { IProduct } from "@/components/ProductComponents/types";

const api_url = "http://localhost:4000/api/v1";

const fetchProductsFromApi = async () => {
  const response = await fetch(`${api_url}/products`);
  if (!response.ok) {
    throw new Error("Error fetching products");
  }
  const data = await response.json();
  return data;
};
export default function LandingCardContainer() {
  const {
    isLoading: isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsFromApi,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return <ErrorScreen />;
  }
  return (
    <section className="w-full  py-10 z-[0] ">
      <div className="container w-11/12 m-auto">
        <h1 className="text-3xl font-bold font-helvetica mb-10 text-center md:text-left">
          COLECCIÓN 2024
        </h1>
        <div className="w-full flex flex-row flex-wrap justify-center  gap-5">
          {isLoading && !data
            ? [...Array(10)].map((index) => (
                <div key={index} className="item flex flex-row z-[-3]">
                  <LandingCardLoading />
                </div>
              ))
            : data.data.map((product: IProduct) => (
                <div key={product._id}>
                  <LandingCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
