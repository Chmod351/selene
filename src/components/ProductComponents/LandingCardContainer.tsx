import { useQuery } from "@tanstack/react-query";
import LandingCard from "./LandingCard";
import LandingCardLoading from "@/components/Ui/LandingCardLoading";
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
    return <div>Error: {error.message}</div>;
  }
  return (
    <section className="w-full  py-10 z-[0] ">
      <div className="md:max-w-[1100px] w-11/12 m-auto">
        <h1 className="text-3xl font-bold font-helvetica mb-10 text-center md:text-left">
          COLECCIÓN 2024
        </h1>
        <div className="flex flex-wrap gap-5 m-auto justify-center z-10">
          {isLoading && !data
            ? [...Array(8)].map((index) => (
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
