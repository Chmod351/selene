import { useQuery } from "@tanstack/react-query";
const api_url = "http://localhost:4000/api/v1";
import { IProduct } from "@/components/ProductComponents/types";

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

type UseIsQuerySearchResult = {
  data: IProduct[] | undefined;
  error: Error | null;
  isLoading: boolean;
};

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
