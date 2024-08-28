import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "@/components/ProductComponents/types";

const fetchProductsFromApi = async ({
  currentPage,
}: {
  currentPage: number;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API}/products?page=${currentPage}`,
  );
  if (!response.ok) {
    throw new Error("Error fetching products");
  }
  const data = await response.json();
  return data;
};

export default function usePagination() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const {
    isLoading: isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => fetchProductsFromApi({ currentPage }),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && !isLoading) {
      setProducts((prevArr) => [...prevArr, ...data.data]);
    }
  }, [data, isLoading]);

  const goToNextPage = () => {
    if (currentPage < data?.totalPages && !isLoading) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    currentPage,
    goToNextPage,
    products,
    isLoading,
    error,
    data,
  };
}
