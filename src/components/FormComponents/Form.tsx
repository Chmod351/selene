import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import checkFormSchema from "@/components/FormComponents/checkoutFormSchema";
import PaymentInfo from "@/components/Ui/PaymentInfo";

interface FormProps {
  children: React.ReactNode;
}

function Form({ children }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkFormSchema),
  });

  const onSubmitHandler = (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-full bg-white flex flex-col justify-between m-auto rounded-xl items-center h-full mt-28 mb-10">
      {/* retiro de pedido */}
      <div className="w-full my-10 bg-primary rounded-xl">
        <div className="w-11/12 flex justify-evenly flex-col mx-auto py-8 gap-4">
          <label className="font-helvetica">
            <input type="radio" className="mr-2" />
            Retirar por sucursal de correo
          </label>
          <label className="font-helvetica">
            <input type="radio" className="mr-2" />
            Envio estandar a domicilio
          </label>
          <label className="font-helvetica">
            <input type="radio" className="mr-2" />
            Moto mensajeria 24 hs - CABA
          </label>
          <label className="font-helvetica">
            <input type="radio" name="radio" value="" className="mr-2" />
            Moto mensajeria 24 hs - GBA
          </label>
        </div>
      </div>

      <div className="w-full bg-white flex flex-col justify-between m-auto h-auto rounded-xl">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child as React.ReactElement<any>, {
              register,
              errors,
            });
          })}
          <PaymentInfo />
        </form>
      </div>
    </div>
  );
}
export default Form;
