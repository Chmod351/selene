import { useQuery } from "@tanstack/react-query";
import LandingCard from "./LandingCard";
import LandingCardLoading from "@/components/Ui/LandingCardLoading";
import SimulationOfProducts from "./data";

export default function LandingCardContainer() {
  const { isLoading: isLoading, data, error } = useQuery({});

  return (
    <section className="w-full  py-10 z-[0] ">
      <div className="md:max-w-[1100px] w-11/12 m-auto">
        <h1 className="text-3xl font-bold font-helvetica mb-10 text-center md:text-left">
          COLECCIÓN 2024
        </h1>
        <div className="flex flex-wrap gap-5 m-auto justify-center z-10">
          {isLoading
            ? [...Array(4)].map((index) => (
                <div key={index} className="item flex flex-row z-[-3]">
                  <LandingCardLoading />
                </div>
              ))
            : SimulationOfProducts.map((product) => (
                <div key={product.id}>
                  <LandingCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
