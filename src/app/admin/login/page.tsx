"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/FormComponents/Input";
import { z } from "zod";
import SubmitButton from "@/components/Ui/SubmitButton";
import useAdmin from "@/hooks/useAdminHook";

const adminFormSchema = z.object({
  email: z.string().email({ message: "email invalido" }),
  password: z.string().min(1, { message: "password requerido" }),
});

function LoginForm() {
  const { handleSubmitForm, isLoading } = useAdmin();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(adminFormSchema),
  });

  const { errors } = formState;

  return (
    <div className="w-1/2 h-[400px] m-auto mt-20 border-2 rounded-lg container">
      <form
        // @ts-ignore
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col justify-evenly bg-primary px-8 m-auto h-full "
      >
        <InputField
          label="Email"
          name="email"
          register={register}
          errors={errors}
          required
          placeholder="Email *"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          errors={errors}
          required
          placeholder="Password *"
        />
        <SubmitButton label="Login" type="submit" disabled={isLoading} />
      </form>
    </div>
  );
}

function Admin() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center mx-auto mt-32 mb-10 ">
      <LoginForm />
    </main>
  );
}

export default Admin;
