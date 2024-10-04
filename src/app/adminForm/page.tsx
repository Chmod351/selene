"use client";
import React, { useState, useEffect } from "react";
import { dataLeft } from "../admin/formData";
import InputField from "@/components/FormComponents/Input";
import SelectField from "@/components/FormComponents/Select";
import SubmitButton from "@/components/Ui/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import productCreationSchema from "./adminFormSchema";
import sizeOptions from "./adminFormSize";

function AdminForm() {
  const { handleSubmit, register, formState, reset, control, setValue } =
    useForm({
      resolver: zodResolver(productCreationSchema),
    });

  const [formError, setFormError] = useState("");
  const [addMoreClothes, setAddMoreClothes] = useState(1);

  const { errors } = formState;

  console.log(formState.isValid);
  const selectCategory = useWatch({
    control,
    name: "category",
    defaultValue: "",
  });

  console.log({ selectCategory });
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
          }),
        },
      );
      console.log(res);
      if (res.ok) {
        console.log("enviado");
        setFormError("");
        reset();
      } else {
        // i want to scroll up
        console.log("error");
        window.scrollTo(0, 0);
        setFormError(
          "Error al crear el producto, revisa los campos atentamente",
        );
      }
    } catch (e: any) {
      console.log(e);
      window.scrollTo(0, 0);

      setFormError(e.message);
    }
  };

  useEffect(() => {
    const adminData = localStorage.getItem("adminDetails");
    if (!adminData) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mx-auto mt-32 mb-10">
      <section className="container">
        <h1 className="text-3xl font-bold font-helvetica mx-auto text-center p-8">
          {formError ? formError : "Formulario de creación de productos"}
        </h1>
        <form
          className="p-4 gap-4 bg-primary rounded-lg font-helvetica"
          onSubmit={handleSubmit((data: any) => {
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
                    onChange={(e: any) => setValue("category", e.target.value)}
                    label={item.label}
                    name={item.name}
                    defaultValue={"Tops"}
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
              <div key={index} className="flex flex-col gap-4">
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
                  defaultValue={"XS"}
                  options={sizeOptions}
                  onChange={(e) => {
                    setValue(`stock.${index}.size`, e.target.value);
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
                    className="w-full"
                    {...register(`stock.${index}.color`, { required: true })}
                    required
                  />
                </label>
                <div className="flex flex-row gap-4">
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
                    label="Eliminar "
                    disabled={
                      addMoreClothes !== index + 1 || addMoreClothes === 1
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <SubmitButton
            label={
              !formState.isValid
                ? "COMPLETA TODOS LOS CAMPOS"
                : "CREAR PRODUCTO"
            }
            type="submit"
            disabled={false}
          />
        </form>
      </section>
    </div>
  );
}

export default AdminForm;
