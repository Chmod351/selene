import React from "react";
import { IRadioSelectProps } from "@/components/Ui/types";

function RadioSelected({
  fieldChecked,
  paymentMethodText,
  defaultChecked,
  onChangeChecked,
  isSelected,
}: IRadioSelectProps) {
  return (
    <div
      className={`font-helvetica ${isSelected ? "bg-primary border-2 border-primary" : "bg-white border-2 border-black"} w-full rounded-md h-32 flex justify-center items-center cursor-pointer `}
      onClick={() => onChangeChecked(paymentMethodText)}
    >
      <input
        type="radio"
        className="mr-2"
        checked={fieldChecked === paymentMethodText}
        onChange={() => onChangeChecked(paymentMethodText)} // Usamos onChange para actualizar el estado
        defaultChecked={defaultChecked}
      />
      {paymentMethodText}
    </div>
  );
}

export default RadioSelected;
