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
}: {
  label: string;
  name: string;
  register: any;
  errors: any;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  // Desestructuración del error específico del campo basado en el `name`
  const error = errors?.[name.split(".").join("?.")]; // Accede al error anidado

  return (
    <div className="flex flex-col w-full ">
      <label className="font-helvetica text-sm hidden ">{label}</label>
      <input
        className={`rounded p-4 mt-1 placeholder:text-black  outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...register(name, { required })}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
}

export default InputField;
