"use client";
import React, { useState } from "react";
import { dataLeft } from "../admin/formData";
import InputField from "@/components/FormComponents/Input";
import SelectField from "@/components/FormComponents/Select";
import SubmitButton from "@/components/Ui/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import productCreationSchema from "./adminFormSchema";
import sizeOptions from "./adminFormSize";

function AdminForm() {
  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(productCreationSchema),
  });
  const [formError, setFormError] = useState("");
  const [addMoreClothes, setAddMoreClothes] = useState(1);
  const [category, setCategory] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>([]);

  const { errors } = formState;

  console.log(formState.isValid);

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
          body: JSON.stringify({
            ...data,
            category,
          }),
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

  const categoryOnChange = (e: any) => {
    setCategory(e.target.value);
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
            console.log(data);
            handleSubmitFormI(data);
          })}
        >
          <div className="md:grid md:grid-cols-2 gap-4 p-4">
            {dataLeft.map((item) => {
              if (item.name === "category") {
                return (
                  <SelectField
                    errors={errors}
                    key={item.name}
                    onChange={categoryOnChange}
                    label={item.label}
                    name={item.name}
                    value={category}
                    defaultValue={item.defaultValue}
                    register={register}
                    options={item.options}
                  />
                );
              } else {
                return (
                  <InputField
                    key={item.name}
                    label={item.label}
                    name={item.name}
                    type={item.type}
                    register={register}
                    errors={errors}
                    required
                    placeholder={item.placeholder ?? ""}
                  />
                );
              }
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

                <SelectField
                  label="Talla"
                  name={`stock.${index}.size`}
                  register={register}
                  errors={errors}
                  options={sizeOptions}
                  value={`${sizes[index]}`} // agregar el value
                  onChange={(e) => {
                    setSizes((prev) => [
                      ...prev.slice(0, index),
                      e.target.value,
                      ...prev.slice(index + 1),
                    ]);
                  }}
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
                  <SubmitButton
                    disabled={addMoreClothes !== index + 1}
                    type="button"
                    label="Anadir items"
                    onClick={() => setAddMoreClothes(addMoreClothes + 1)}
                  />
                  <SubmitButton
                    type="button"
                    onClick={() =>
                      setAddMoreClothes(
                        addMoreClothes > 1 ? addMoreClothes - 1 : 1,
                      )
                    }
                    label="Eliminar items"
                    disabled={
                      addMoreClothes !== index + 1 || addMoreClothes === 1
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <SubmitButton
            label="CREAR PRODUCTO"
            type="submit"
            disabled={!formState.isValid}
          />
        </form>
      </section>
    </div>
  );
}

export default AdminForm;
