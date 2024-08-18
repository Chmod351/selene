import React, { useContext } from "react";
import EcommerceContext from "@/store/store";
import { IProduct } from "@/components/ProductComponents/types";
import SubmitButton from "@/components/Ui/SubmitButton";

function PaymentInfo() {
  const { cart }: { cart: IProduct[] } = useContext(EcommerceContext);
  return (
    <div className="w-full min-h-[230px]  bg-primary rounded-xl font-helvetica py-8">
      <div className="w-11/12 flex items-center justify-center flex-col gap-4 m-auto">
        {cart.map((item) => (
          <ul key={item.name_es}>
            <span className="flex flex-row gap-4 text-2xl">
              <li>{item.name_es}</li>
              <span>${item.price_es}</span>
            </span>
          </ul>
        ))}
        <strong className="text-3xl">
          Total: ${cart.reduce((a, b) => a + b.price_es, 0)}{" "}
        </strong>

        <SubmitButton
          type="submit"
          label="Pagar"
          onClick={() => {}}
          disabled={true}
        />
      </div>
    </div>
  );
}

export default PaymentInfo;
