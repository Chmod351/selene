"use client";
import Form from "@/components/FormComponents/Form";
import checkoutFormData from "@/components/FormComponents/data";
import { useState } from "react";

export default function CheckoutPage() {
  const [isCheckoutForm, setIsCheckoutForm] = useState<boolean>(true);
  const [isMercadoPagoSelected, setIsMercadoPagoSelected] = useState(true);
  return (
    <main className="container m-auto min-h-screen flex justify-center items-center">
      {isCheckoutForm ? (
        <Form
          setIsCheckoutForm={setIsCheckoutForm}
          fields={checkoutFormData}
          onSubmit={(data) => console.log(data)}
        />
      ) : (
        <section className="w-full max-w-4xl mx-auto justify-center items-center flex flex-col gap-4">
          <h1 className="text-3xl font-bold font-helvetica mb-8">
            Selecciona un Método de Pago
          </h1>
          <div className="w-full flex flex-col gap-4 items-center">
            <div
              className={`font-helvetica ${isMercadoPagoSelected ? "bg-primary" : "bg-white"} w-full rounded-md h-32 flex justify-center items-center cursor-pointer border-2 border-primary`}
              onClick={() => setIsMercadoPagoSelected(!isMercadoPagoSelected)}
            >
              <input
                type="radio"
                className="mr-2"
                checked={isMercadoPagoSelected}
              />
              Abonar con Mercado Pago
            </div>
            <div
              className={`font-helvetica ${!isMercadoPagoSelected ? "bg-primary" : "bg-white"} w-full rounded-md h-32 flex justify-center items-center cursor-pointer border-2 border-primary `}
              onClick={() => setIsMercadoPagoSelected(!isMercadoPagoSelected)}
            >
              <input
                type="radio"
                className="mr-2"
                checked={!isMercadoPagoSelected}
              />
              Abonar con transferencia Bancaria
            </div>
          </div>
          <p>Lorem ipsum dolor sit amet...</p>
          <p>Lorem ipsum dolor sit amet...</p>
        </section>
      )}
    </main>
  );
}
