import { ButtonFormProps } from "@/components/FormComponents/types";
export default function ButtonForm({ ...props }: ButtonFormProps) {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-xl"
    >
      Submit
    </button>
  );
}
