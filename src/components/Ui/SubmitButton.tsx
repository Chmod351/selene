import { ButtonFormProps } from "@/components/FormComponents/types";

export default function SubmitButton({ ...props }: ButtonFormProps) {
  if (props.disabled) {
    return (
      <button
        type={props.type}
        disabled={props.disabled}
        onClick={props.onClick}
        className="bg-gray-400   hover:cursor-pointer hover:border-2 border-gray-400 border-2 text-white font-bold py-2 px-4 rounded-xl w-full  h-20"
      >
        {props.label}
      </button>
    );
  }
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      className="bg-black hover:bg-white hover:text-black hover:border-black hover:cursor-pointer hover:border-2 border-black border-2 text-white font-bold py-2 px-4 rounded-xl w-full  h-20"
    >
      {props.label}
    </button>
  );
}
