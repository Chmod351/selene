"use client";
import React, { useState, useEffect } from "react";
import useAdmin from "@/hooks/useAdminHook";
import { dataLeft } from "../admin/formData";
import InputField from "@/components/FormComponents/Input";
import SubmitButton from "@/components/Ui/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const productCreationSchema = z.object({
  category: z.string().min(1, { message: "Categorias requeridas" }),
  seasson: z.string().min(1, { message: "Temporada requerida" }),
  description_en: z
    .string()
    .min(1, { message: "Descripicion en ingles requerida" }),
  description_es: z
    .string()
    .min(1, { message: "Descripicion en Español requerida" }),
  name_en: z.string().min(1, { message: "Nombre en ingles requerido" }),
  name_es: z.string().min(1, { message: "Nombre en Español requerido" }),
  price_en: z.string().min(1, { message: "Precio en dolares requerido" }),
  price_es: z.string().min(1, { message: "Precio en pesos requerido" }),
  image0: z.string().min(1, { message: "Imagen requerida" }),
  image1: z.string().min(1, { message: "Imagen requerida" }),
  image2: z.string().min(1, { message: "Imagen requerida" }),
  image3: z.string().min(1, { message: "Imagen requerida" }),
  weight: z.string().min(1, { message: "Peso requerido" }),
  stock: z.array(
    z.object({
      provider: z.string().min(1, { message: "Provider requerido" }),
      provider_cost: z.string().min(1, { message: "Provider Coste requerido" }),
      color: z.string().min(1, { message: "Color requerido" }),
      size: z.string().min(1, { message: "Talla requerida" }),
      quantity: z.string().min(1, { message: "Stock requerido" }),
    }),
  ),
});
function AdminForm() {
  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(productCreationSchema),
  });
  const [formError, setFormError] = useState("");
  const [addMoreClothes, setAddMoreClothes] = useState(4);
  const { errors } = formState;

  const handleSubmitFormI = async (data: any) => {
    console.log("Datos enviados:", data);
    setFormError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API}/products/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (res.ok) {
        console.log("enviado");
      } else {
        console.log("error");
        setFormError("Error al crear el producto");
      }
    } catch (e: any) {
      console.log(e);
      setFormError(e.message);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center mx-auto mt-32 mb-10">
      <section className="container">
        <h1 className="text-3xl font-bold font-helvetica mx-auto text-center p-8">
          Creacion de productos
        </h1>
        <form
          className="p-4 gap-4 bg-primary"
          onSubmit={handleSubmit((data: any) => {
            console.log("enviando form");
            handleSubmitFormI(data);
          })}
        >
          <div className="md:grid md:grid-cols-2 gap-4 p-4">
            {dataLeft.map((item) => {
              return (
                <InputField
                  key={item.name}
                  label={item.label}
                  name={item.name}
                  type={item.type}
                  register={register}
                  errors={errors}
                  required
                  placeholder={item.placeholder}
                />
              );
            })}
          </div>
          {formError && <p className="text-red-500">{formError}</p>}
          <h1 className="text-3xl font-bold font-helvetica">Manejo de Stock</h1>
          <div className="md:grid md:grid-cols-4 gap-4 p-4">
            {[...Array(addMoreClothes)].map((_, index) => (
              <div key={index}>
                <InputField
                  label="Proveedor"
                  name={`stock.${index}.provider`}
                  register={register}
                  errors={errors}
                  required
                  placeholder="Nombre del Proveedor"
                />

                <InputField
                  label="Coste del Proveedor"
                  name={`stock.${index}.provider_cost`}
                  register={register}
                  type="number"
                  errors={errors}
                  required
                  placeholder="Coste del Proveedor sin $ *"
                />

                <InputField
                  label="Talle"
                  name={`stock.${index}.size`}
                  register={register}
                  errors={errors}
                  required
                  placeholder="XL, L, M, S *"
                />
                <InputField
                  label="Stock"
                  name={`stock.${index}.quantity`}
                  type="number"
                  register={register}
                  errors={errors}
                  required
                  placeholder="stock *"
                />
                <label className="font-helvetica text-sm font-bold flex flex-col gap-4 my-4">
                  Color
                  <input
                    type="color"
                    {...register(`stock.${index}.color`, { required: true })}
                    required
                  />
                </label>
                <div className="flex flex-row ">
                  <button
                    type="button"
                    onClick={() => setAddMoreClothes(addMoreClothes + 1)}
                    className="bg-black hover:bg-white hover:text-black hover:border-black hover:cursor-pointer hover:border-2 border-black border-2 text-white font-bold py-2 px-4 rounded-xl w-full  h-14"
                  >
                    añadir stock
                  </button>
                  <button
                    type="button"
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
          <SubmitButton label="Crear" type="submit" disabled={false} />
        </form>
      </section>
    </div>
  );
}

export default AdminForm;
