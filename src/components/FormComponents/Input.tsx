import React from "react";

function InputField({
  label,
  name,
  register,
  errors,
  placeholder,
  type = "text",
  required,
}: any) {
  return (
    <div className="flex flex-col w-full ">
      <label className="font-helvetica text-sm hidden ">{label}</label>
      <input
        className={` rounded p-4 mt-1 placeholder:text-black  outline-none  ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
        {...register(name, { required })}
        placeholder={placeholder}
        type={type}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          Este campo es obligatorio
        </span>
      )}
    </div>
  );
}

export default InputField;
