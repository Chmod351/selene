import { IProduct } from "@/components/ProductComponents/types";
import React from "react";

export interface ICartProduct extends IProduct {
  color: string;
  size: string;
  quantity: number;
}

export interface ICartProps {
  cart: ICartProduct[];
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ICart {
  cart: ICartProduct[];
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCartOpen: boolean;
  isMobile: boolean;
}

// Radio Select
export interface IRadioSelectProps {
  fieldChecked: string;
  paymentMethodText: string;
  defaultChecked?: boolean;
  isSelected: boolean;
  onChangeChecked: (value: string) => void;
}

// SEARCH

export interface SearchResultsLogicProps {
  setQuery: React.Dispatch<React.SetStateAction<string | null>>;
  data: IProduct[] | undefined;
  error: Error | null;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export interface SearchBarComponentProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickWithQuery: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  query: string | null;
}

export interface SlidingPaneSearchProps {
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchOpen: boolean;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickWithQuery: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  query: string | null;
  children: React.ReactNode;
}
