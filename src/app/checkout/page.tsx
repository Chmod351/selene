"use client";
import Form from "@/components/FormComponents/Form";
import checkoutFormData from "@/components/FormComponents/data";
export default function CheckoutPage() {
  return (
    <main className="container mx-auto justify-center">
      <Form fields={checkoutFormData} onSubmit={(data) => console.log(data)} />
    </main>
  );
}
