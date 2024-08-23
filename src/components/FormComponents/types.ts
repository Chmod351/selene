import React from "react";

export interface SelectFieldProps {
  onChange: (event: any) => void;
  errors: any;
  name: string;
  defaultValue?: string | number;
  label: string;
  value: string | number;
  register: any;
  options: { value: string | number; label: string }[];
}
export interface FormProps {
  children: React.ReactNode;
  setIsCheckoutForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface InputFieldProps {
  type: string;
  label: string;
  placeholder: string;
  name: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (event: any) => void;
  errors: any;
  required?: boolean;
  register: any;
}

export interface ButtonFormProps {
  type: "submit" | "button" | "reset";
  label: string;
  onClick?: () => void;
  disabled: boolean;
}
