import React, { useContext } from "react";
import EcommerceContext from "@/store/store";

function PaymentInfo({ children }: any) {
  const {
    cart,
    total,
  }: {
    cart: {
      _id: string;
      name_es: string;
      price_es: number;
      quantity: number;
    }[];
    total: number;
  } = useContext(EcommerceContext);
  return (
    <div className="w-full min-h-[230px]  bg-primary rounded-xl font-helvetica py-8">
      <div className="w-11/12 flex items-center justify-center flex-col gap-4 m-auto">
        {cart.map((item) => (
          <ul key={item._id}>
            <span className="flex flex-row gap-4 text-2xl">
              <li>{item.name_es}</li>
              <span>
                ${item.price_es} - {item.quantity} u
              </span>
            </span>
          </ul>
        ))}
        <br />
        <strong className="text-3xl">
          Total con Entrega/Retiro incluido: ${total}
        </strong>
        {children}
      </div>
    </div>
  );
}

export default PaymentInfo;
