import { InputFieldProps } from "@/components/FormComponents/types";
export default function InputField({ ...props }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-4 w-full font-helvetica ">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        className="border border-none  p-2 appearance-textfield [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none rounded"
        defaultValue={props.defaultValue}
        type={props.type}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <span className="text-red-500">{props.errors}</span>
      <br />
    </div>
  );
}
