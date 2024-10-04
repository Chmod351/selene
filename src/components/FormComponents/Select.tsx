import { SelectFieldProps } from "@/components/FormComponents/types";
import React from "react";

export default function SelectField({ ...props }: SelectFieldProps) {
  let error;
  if (props.errors.isArray) {
    error = props.errors?.[0]?.[props.name.split(".").join("?.")];
  } else {
    error = props.errors?.[props.name.split(".").join("?.")];
  }
  return (
    <div className="flex flex-col gap-1 w-full font-helvetica  ">
      <label htmlFor={props.name} className="font-bold">
        {props.label}
      </label>
      <select
        className="rounded  p-4"
        id={props.name}
        required={true}
        name={props.name}
        {...props.register}
        // value={props.value}
        onChange={props.onChange}
        defaultValue={{ value: "", label: "" }}
        // defaultValue={props.defaultValue}
      >
        {props.options.map((option: { label: string; value: string }) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.value === "none"}
          >
            {option.label}
          </option>
        ))}
      </select>
      <br />
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
      {props.errors?.stock?.length > 0 && props.name.startsWith("stock") && (
        <span className="text-red-500 text-sm mt-1">
          la informacion del stock debe estar completa
        </span>
      )}
    </div>
  );
}
