"use client";
import Form from "@/components/FormComponents/Form";
import FormCheckout from "@/components/FormComponents/FormCheckout";
import SubmitButton from "@/components/Ui/SubmitButton";
import RadioSelected from "@/components/Ui/RadioSelected";
import { useState } from "react";

export default function CheckoutPage() {
  const [isCheckoutForm, setIsCheckoutForm] = useState<boolean>(true);
  const [fieldChecked, setFieldChecked] = useState<string>("mercado-pago");

  return (
    <main className="container m-auto min-h-screen flex justify-center items-center  flex-col mt-10">
      {isCheckoutForm ? (
        <Form>
          <FormCheckout />
        </Form>
      ) : (
        <section className="md:w-full w-11/12 max-w-4xl mx-auto justify-center items-center flex flex-col gap-4 mt-28">
          <h1 className="md:text-3xl font-bold font-helvetica mb-8 text-2xl text-center">
            Selecciona un Método de Pago
          </h1>
          <RadioSelected
            fieldChecked={fieldChecked}
            paymentMethodText="Mercado Pago"
            isSelected={fieldChecked === "Mercado Pago"}
            onChangeChecked={(value) => setFieldChecked(value)}
          />
          <RadioSelected
            fieldChecked={fieldChecked}
            paymentMethodText="Tarjeta de Credito"
            isSelected={fieldChecked === "Tarjeta de Credito"}
            onChangeChecked={(value) => setFieldChecked(value)}
          />
          <p>
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <p>
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur
            adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <div className="md:w-[400px] w-full h-[120px] mt-8">
            <SubmitButton
              label="CONFIRMAR MÉTODO DE PAGO"
              type="submit"
              onClick={() => setIsCheckoutForm(false)}
              disabled={false}
            />
          </div>
        </section>
      )}
    </main>
  );
}
