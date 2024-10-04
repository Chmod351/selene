import { SelectFieldProps } from "@/components/FormComponents/types";
export default function SelectField({ ...props }: SelectFieldProps) {
  let error;
  if (props.errors.isArray) {
    error = props.errors?.[0]?.[props.name.split(".").join("?.")];
    console.log("errrrrrrrrrrrr", error);
  } else {
    error = props.errors?.[props.name.split(".").join("?.")];
  }
  return (
    <div className="flex flex-col gap-1 w-full font-helvetica  ">
      <label htmlFor={props.name}>{props.label}</label>
      <select
        className="rounded  p-4"
        id={props.name}
        required={true}
        {...props.register}
        name={props.name}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      >
        {props.options.map((option: { label: string; value: string }) => (
          <option key={option.value} value={option.value}>
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
