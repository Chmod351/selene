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
  let error;
  if (errors.isArray) {
    error = errors?.[0]?.[name.split(".").join("?.")];
  } else {
    error = errors?.[name.split(".").join("?.")];
  }
  console.log(error);
  return (
    <div className="flex flex-col w-full ">
      <label className="font-helvetica text-sm font-bold">{label}</label>
      <input
        className={`rounded p-4 mt-1 placeholder:text-black  outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...register(name, { required })}
        placeholder={placeholder}
        type={type ? type : "text"}
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
