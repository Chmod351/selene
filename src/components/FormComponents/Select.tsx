import { SelectFieldProps } from "@/components/FormComponents/types";
export default function SelectField({ ...props }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1 w-full font-helvetica  ">
      <label htmlFor={props.name}>{props.label}</label>
      <select
        className="rounded  p-2"
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="text-red-500">{props.errors}</span>
      <br />
    </div>
  );
}
