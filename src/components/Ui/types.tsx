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
