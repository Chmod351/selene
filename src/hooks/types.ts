import React from "react";
import { IProduct } from "@/components/ProductComponents/types";

export type UseIsQuerySearchResult = {
  data: IProduct[] | undefined;
  error: Error | null;
  isLoading: boolean;
};

export type UseIsMobileResult = {
  isMobile: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UsePaginationResult = {
  currentPage: number;
  goToNextPage: () => void;
  products: IProduct[] | [];
  isLoading: boolean;
  error: Error | null;
  data: any;
};
