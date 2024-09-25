import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import checkFormSchema from "@/components/FormComponents/checkoutFormSchema";
import PaymentInfo from "@/components/Ui/PaymentInfo";
import SubmitButton from "@/components/Ui/SubmitButton";
import EcommerceContext from "@/store/store";
import { DataProps } from "@/store/store";
import { FormProps } from "@/components/FormComponents/types";

function Form({ children, setIsCheckoutForm }: FormProps) {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(checkFormSchema),
  });
  const { userData, setUserData } = useContext(EcommerceContext);

  const handleDataAndMoveToNextStep = (data: DataProps) => {
    if (formState.isValid) {
      setUserData({
        ...data,
      });
      setIsCheckoutForm(false);
    }
  };
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
                value="PickUp"
                {...register("deliveryMode")}
                checked={userData.deliveryMode === "Pickup"}
                onChange={() =>
                  setUserData({ ...userData, deliveryMode: "Pickup" })
                }
              />
              Retirar por sucursal de correo
            </label>
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="Standard"
                {...register("deliveryMode")}
                checked={userData.deliveryMode === "Standard"}
                onChange={() =>
                  setUserData({ ...userData, deliveryMode: "Standard" })
                }
              />
              Envío estándar a domicilio
            </label>
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="Express_CABA"
                {...register("deliveryMode")}
                checked={userData.deliveryMode === "Express_CABA"}
                onChange={() =>
                  setUserData({ ...userData, deliveryMode: "Express_CABA" })
                }
              />
              Moto mensajería 24 hs - CABA
            </label>
            <label className="font-helvetica">
              <input
                type="radio"
                className="mr-2"
                value="Express_GBA"
                {...register("deliveryMode")}
                checked={userData.deliveryMode === "Express_GBA"}
                onChange={() =>
                  setUserData({ ...userData, deliveryMode: "Express_GBA" })
                }
              />
              Moto mensajería 24 hs - GBA
            </label>
          </div>
        </div>
        <div className="w-1/2 "> asdsadas</div>
      </div>

      <div className="w-full bg-white flex flex-col justify-between m-auto h-auto rounded-xl">
        {/* @ts-ignore */}
        <form onSubmit={handleSubmit(handleDataAndMoveToNextStep)}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child as React.ReactElement<any>, {
              register,
              defaultValue: userData,
              isDisabled: !userData.deliveryMode ? true : false,
              errors: formState.errors,
            });
          })}
          <PaymentInfo>
            <SubmitButton
              disabled={userData.deliveryMode ? false : true}
              label="CONFIRMAR PEDIDO"
              type="submit"
            />
          </PaymentInfo>
        </form>
      </div>
    </div>
  );
}
export default Form;
