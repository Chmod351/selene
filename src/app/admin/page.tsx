"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/FormComponents/Input";
import { z } from "zod";
import SubmitButton from "@/components/Ui/SubmitButton";
import { dataLeft } from "./formData";

const adminFormSchema = z.object({
  email: z.string().email({ message: "email invalido" }),
  password: z.string().min(1, { message: "password requerido" }),
});

function Admin() {
  const [addMoreClothes, setAddMoreClothes] = useState(4);
  const [isLoged, setLoged] = useState<boolean | null>(null);
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(adminFormSchema),
  });
  const { errors } = formState;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendFormData = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const result = await res.json();
      console.log(result);

      return result;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const handleSubmitForm = async (data: FormData) => {
    const result = await sendFormData(data);
    console.log(result, "asdasd");
    if (result.message === "task done susscessfully") {
      localStorage.setItem("adminDetails", JSON.stringify(result.session));
      setLoged(true);
    } else {
      setLoged(false);
      console.log({ result });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("adminDetails")) {
      setLoged(true);
    }
  }, []);

  return (
    <main className="w-full h-full flex flex-col items-center justify-center mx-auto mt-32 mb-10 ">
      {!isLoged ? (
        <div className="w-1/2 h-[400px] m-auto mt-20 border-2 rounded-lg container">
          <form
            // onSubmit={handleSubmit(handleSubmitForm)}
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
            <SubmitButton
              label="Login"
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit(handleSubmitForm)}
            />
          </form>
        </div>
      ) : (
        <section className="container">
          <h1 className="text-3xl font-bold font-helvetica mx-auto text-center p-8">
            Creacion de productos
          </h1>
          <form
            className="p-4 gap-4 bg-primary"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <div className="md:grid md:grid-cols-2 gap-4 p-4">
              {dataLeft.map((item) => {
                return (
                  <InputField
                    key={item.name}
                    label={item.label}
                    name={item.name}
                    register={register}
                    errors={errors}
                    required
                    placeholder={item.placeholder}
                  />
                );
              })}
            </div>
            <h1 className="text-3xl font-bold font-helvetica">Prendas</h1>
            <div className="md:grid md:grid-cols-4 gap-4 p-4">
              {[...Array(addMoreClothes)].map((_, index) => (
                <div key={index}>
                  <InputField
                    label="Talle"
                    name={`size${addMoreClothes}`}
                    register={register}
                    errors={errors}
                    required
                    placeholder="XL, L, M, S *"
                  />
                  <InputField
                    label="Stock"
                    name={`stock${addMoreClothes}`}
                    type="number"
                    register={register}
                    errors={errors}
                    required
                    placeholder="stock *"
                  />
                  <label className="font-helvetica text-sm font-bold flex flex-col gap-4 mb-4">
                    Color
                    <input type="color" name={`color${addMoreClothes}`} />
                  </label>
                  <div className="flex flex-row ">
                    <button
                      onClick={() => setAddMoreClothes(addMoreClothes + 1)}
                      className="bg-black hover:bg-white hover:text-black hover:border-black hover:cursor-pointer hover:border-2 border-black border-2 text-white font-bold py-2 px-4 rounded-xl w-full  h-14"
                    >
                      añadir stock
                    </button>
                    <button
                      onClick={() =>
                        setAddMoreClothes(
                          addMoreClothes > 1 ? addMoreClothes - 1 : 1,
                        )
                      }
                      className="bg-red-500 hover:bg-white hover:text-black hover:border-black hover:cursor-pointer hover:border-2 border-black border-2 text-white font-bold py-1 px-4 rounded-xl w-full  h-14"
                    >
                      eliminar{" "}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <SubmitButton label="Crear" type="submit" disabled={isLoading} />
          </form>
        </section>
      )}
    </main>
  );
}

export default Admin;
