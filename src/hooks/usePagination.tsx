import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "@/components/ProductComponents/types";
import { UsePaginationResult } from "@/hooks/types";

export default function usePagination(): UsePaginationResult {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[] | []>([]);

  const fetchProductsFromApi = async ({
    currentPage,
  }: {
    currentPage: number;
  }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API}/products?page=${currentPage}`,
      );
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      console.log({ response });
      const data = await response.json();
      return data;
    } catch (e) {
      /* handle error */
      console.log(e);
    }
  };

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
