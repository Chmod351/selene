"use client";
import React, { useState } from "react";
import { dataLeft } from "../../admin/create/formData";
import InputField from "@/components/FormComponents/Input";
import SelectField from "@/components/FormComponents/Select";
import SubmitButton from "@/components/Ui/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productEditionSchema } from "../../admin/create/adminFormSchema";
import sizeOptions from "../../admin/create/adminFormSize";
// import { IProduct } from "@/components/ProductComponents/types";

function EditProduct({ product }: { product: any }) {
  const { handleSubmit, register, formState, reset, setValue } = useForm({
    resolver: zodResolver(productEditionSchema),
  });

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [addMoreClothes, setAddMoreClothes] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { errors } = formState;
  console.log("lkajdladjaskldlskadj");
  const handleSubmitFormI = async (data: any) => {
    console.log("Datos enviados:", data);
    setFormError("");
    setIsLoading(true);
    console.log(data);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API}/products/update/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            image_url: [data.image0, data.image1, data.image2, data.image3],
          }),
        },
      );
      console.log(res);
      if (res.ok) {
        console.log("enviado");
        setFormError("");
        setFormSuccess("Prenda  cargada exitosamente");
        reset();
      } else {
        // i want to scroll up
        console.log("error");
        window.scrollTo(0, 0);
        setFormError(
          "Error al crear el producto, revisa los campos atentamente",
        );
      }
      setIsLoading(false);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      // i want to scroll up
      window.scrollTo(0, 0);

      setFormError(e.message);
    }
  };
  console.log(product);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center mx-auto mt-32 mb-10">
      <section className="container">
        <h1 className="text-3xl font-bold font-helvetica mx-auto text-center p-8">
          {formError ? formError : "Formulario de EDICION de productos"}
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
              console.log(item);
              if (item.name === "category") {
                return (
                  <SelectField
                    errors={errors}
                    required={false}
                    key={item.name}
                    onChange={(e: any) => setValue("category", e.target.value)}
                    label={item.label}
                    name={item.name}
                    defaultValue={product?.category}
                    register={register}
                    options={item.options}
                  />
                );
              } else if (
                item.name === "image0" ||
                item.name === "image1" ||
                item.name === "image2" ||
                item.name === "image3"
              ) {
                return (
                  <InputField
                    key={item.name}
                    label={item.label}
                    name={item.name}
                    type={item.type}
                    defaultValue={product?.image_url[0]}
                    register={register}
                    errors={errors}
                    required={false}
                    placeholder={item.placeholder ?? ""}
                  />
                );
              } else {
                return (
                  <InputField
                    key={item.name}
                    label={item.label}
                    name={item.name}
                    type={item.type}
                    defaultValue={product?.[item.name]}
                    register={register}
                    errors={errors}
                    required={false}
                    placeholder={item.placeholder ?? ""}
                  />
                );
              }
            })}
          </div>
          {formError && <p className="text-red-500">{formError}</p>}
          <h1 className="text-3xl font-bold font-helvetica">Manejo de Stock</h1>
          <div className="md:grid md:grid-cols-4 gap-4 p-4">
            {product?.stock.map((p: any, index: number) => (
              <div key={index} className="flex flex-col gap-4">
                <InputField
                  label="Proveedor"
                  name={`stock.${index}.provider`}
                  register={register}
                  errors={errors}
                  defaultValue={p.provider}
                  required={false}
                  placeholder="Nombre del Proveedor"
                />

                <InputField
                  label="Coste del Proveedor"
                  name={`stock.${index}.provider_cost`}
                  register={register}
                  type="number"
                  errors={errors}
                  defaultValue={p.provider_cost}
                  required={false}
                  placeholder="Coste del Proveedor sin $ *"
                />

                <SelectField
                  required={false}
                  label="Talla"
                  name={`stock.${index}.size`}
                  register={register}
                  errors={errors}
                  defaultValue={p.size[0]}
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
                  required={false}
                  defaultValue={p.quantity}
                  placeholder="stock *"
                />
                <label className="font-helvetica text-sm font-bold flex flex-col gap-4 my-4">
                  Color
                  <input
                    type="color"
                    className="w-full"
                    {...register(`stock.${index}.color`, { required: true })}
                    required={false}
                    defaultValue={p.color[0]}
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
            disabled={isLoading}
          />
        </form>
        {formSuccess && (
          <p className="text-green-500 text-center p-4">{formSuccess}</p>
        )}
      </section>
    </div>
  );
}

export default EditProduct;
