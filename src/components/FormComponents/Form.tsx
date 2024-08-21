import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import checkFormSchema from "@/components/FormComponents/checkoutFormSchema";
import PaymentInfo from "@/components/Ui/PaymentInfo";
import SubmitButton from "@/components/Ui/SubmitButton";

interface FormProps {
  children: React.ReactNode;
  setIsCheckoutForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function Form({ children, setIsCheckoutForm }: FormProps) {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(checkFormSchema),
  });

  const [deliveryMode, setDeveliveryMode] = useState<string | null>(null);
  console.log(formState.isValid);

  return (
    <div className="w-full bg-white flex flex-col justify-between m-auto rounded-xl items-center h-full mt-28 mb-10">
      {/* retiro de pedido */}
      <div className="w-full my-10 bg-primary rounded-xl flex flex-row ">
        <div className="w-1/2 ">
          <div className="flex justify-evenly flex-col mx-auto py-8 gap-4 ml-8">
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="Pickup"
                {...register("deliveryMode")}
                checked={deliveryMode === "Pickup"}
                onChange={() => setDeveliveryMode("Pickup")}
              />
              Retirar por sucursal de correo
            </label>
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="Standard"
                {...register("deliveryMode")}
                checked={deliveryMode === "Standard"}
                onChange={() => setDeveliveryMode("Standard")}
              />
              Envío estándar a domicilio
            </label>
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="Express_CABA"
                {...register("deliveryMode")}
                checked={deliveryMode === "Express_CABA"}
                onChange={() => setDeveliveryMode("Express_CABA")}
              />
              Moto mensajería 24 hs - CABA
            </label>
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="Express_GBA"
                {...register("deliveryMode")}
                checked={deliveryMode === "Express_GBA"}
                onChange={() => setDeveliveryMode("Express_GBA")}
              />
              Moto mensajería 24 hs - GBA
            </label>
          </div>
        </div>
        <div className="w-1/2 animate-pulse h-52 bg-gray-600"></div>
      </div>

      <div className="w-full bg-white flex flex-col justify-between m-auto h-auto rounded-xl">
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child as React.ReactElement<any>, {
              register,
              isDisabled: !deliveryMode ? true : false,
              errors: formState.errors,
            });
          })}
          <PaymentInfo>
            <SubmitButton
              disabled={deliveryMode ? false : true}
              label="Confirmar pedido"
              type="submit"
            />
          </PaymentInfo>
        </form>
      </div>
    </div>
  );
}
export default Form;
