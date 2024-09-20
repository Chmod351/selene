import { useQuery } from "@tanstack/react-query";
const api_url = process.env.NEXT_PUBLIC_REACT_APP_API;
import { IProduct } from "@/components/ProductComponents/types";
import { UseIsQuerySearchResult } from "@/hooks/types";

async function fetchProductsFromApi(query: string): Promise<IProduct[]> {
  if (query) {
    const response = await fetch(`${api_url}/products/search?q=${query}`);
    if (!response.ok) {
      throw new Error("Error fetching products");
    }
    const data: IProduct[] = await response.json();
    return data;
  }
  return [];
}

function useIsQuerySearch(query: string | null): UseIsQuerySearchResult {
  const { isLoading, data, error } = useQuery<IProduct[], Error>({
    queryKey: ["products", query],
    queryFn: () => fetchProductsFromApi(query || ""),
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
    isLoading,
  };
}

export { useIsQuerySearch, fetchProductsFromApi };
