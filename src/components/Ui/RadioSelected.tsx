import React from "react";

function RadioSelected({
  fieldChecked,
  paymentMethodText,
  defaultChecked,
  onChangeChecked,
  isSelected,
}: {
  isSelected: boolean;
  fieldChecked: string;
  paymentMethodText: string;
  defaultChecked?: boolean;
  onChangeChecked: (value: string) => void;
}) {
  return (
    <div
      className={`font-helvetica ${isSelected ? "bg-primary" : "bg-white"} w-full rounded-md h-32 flex justify-center items-center cursor-pointer border border-2-black`}
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
