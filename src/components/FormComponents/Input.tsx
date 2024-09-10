import React from "react";

function InputField({
  label,
  name,
  register,
  errors,
  placeholder,
  type = "text",
  disabled,
  required,
  defaultValue,
}: {
  label: string;
  defaultValue?: string | number;
  name: string;
  register: any;
  errors: any;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  const error = errors?.[name.split(".").join("?.")];

  return (
    <div className="flex flex-col w-full ">
      <label className="font-helvetica text-sm font-bold">{label}</label>
      <input
        className={`rounded p-4 mt-1 placeholder:text-black  outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...register(name, { required })}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        defaultValue={defaultValue}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
}

export default InputField;
