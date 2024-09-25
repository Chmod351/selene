"use client";
import Form from "@/components/FormComponents/Form";
import FormCheckout from "@/components/FormComponents/FormCheckout";
import { useState } from "react";

import PaymentMethod from "@/components/FormComponents/PaymentMethod";

export default function CheckoutPage() {
  const [isCheckoutForm, setIsCheckoutForm] = useState<boolean>(true);

  return (
    <main className="container m-auto min-h-screen flex justify-center items-center  flex-col mt-10">
      {isCheckoutForm ? (
        <Form setIsCheckoutForm={setIsCheckoutForm}>
          {/* @ts-ignore */}
          <FormCheckout />
        </Form>
      ) : (
        <PaymentMethod />
      )}
    </main>
  );
}
