import React from "react";

export interface SelectFieldProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (event: any) => void;
  name: string;
  defaultValue?: string | number;
  label: string;
  value?: string | number;
  register: any;
  errors: any;
  options: any;
}
export interface FormProps {
  children: React.ReactNode;
  setIsCheckoutForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface InputFieldProps {
  type: string;
  label: string;
  placeholder?: string;
  name: string;
  value?: string | number;
  defaultValue?: string | number;
  // eslint-disable-next-line no-unused-vars
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

export interface FormCheckoutProps {
  register: any;
  errors: any;
  isDisabled: boolean;
  defaultValue: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    phoneNumber: string;
    email: string;
    deliveryMode: string;
    zip: string;
    country: string;
    state: string;
    userIdCard: string;
    floor: string;
    commentaries: string;
    paymentMethod: string;
    shippingAddress1: string;
  };
}
