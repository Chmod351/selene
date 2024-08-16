import { ButtonFormProps } from "@/components/FormComponents/types";

export default function SubmitButton({ ...props }: ButtonFormProps) {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      className="bg-black hover:bg-white hover:text-black hover:border-black hover:border-2 border-black border-2 text-white font-bold py-2 px-4 rounded-sm w-full h-14"
    >
      {props.label}
    </button>
  );
}
