import { FieldError } from "react-hook-form";

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
  onSubmit: (data: any) => void;
  fields: {
    type: string;
    name: string;
    label: string;
    placeholder: string;
    required?: boolean;
    defaultValue?: string | number;
    value: string | number;
    onChange: (event: any) => void;
    onClick: () => void;
    disabled: boolean;
    options: { value: string | number; label: string }[];
    errors: any;
    register?: any;
  }[];
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
