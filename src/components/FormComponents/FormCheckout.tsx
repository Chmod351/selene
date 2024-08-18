import React from "react";
import InputField from "./Input";

function FormCheckout({ register, errors }: any) {
  return (
    <>
      <div className="bg-primary p-8 rounded-xl">
        <div className="w-full justify-center mx-auto  font-helvetica ">
          <h1 className="text-xs font-bold text-center md:text-left mb-10 ">
            DIRECCION DE ENVIO (* OBLIGATORIA)
          </h1>
        </div>

        <div className="w-full justify-center mx-auto  rounded-xl gap-4">
          <div className="flex flex-wrap gap-7 flex-row ">
            <div className="md:w-[48.7%] w-full">
              <InputField
                label="Nombre"
                name="nombre"
                register={register}
                errors={errors}
                placeholder="Nombre *"
                required
              />
            </div>
            <div className="md:w-[48.7%] w-full ">
              <InputField
                label="Apellido"
                name="apellido"
                register={register}
                errors={errors}
                placeholder="Apellido *"
                required
              />
            </div>
          </div>
          <br />
          <InputField
            label="Dirección *"
            name="direccion"
            register={register}
            errors={errors}
            placeholder="Dirección *"
            required
          />
          <br />
          <div className="flex flex-wrap gap-7 ">
            <div className="md:w-[48.7%] w-full">
              <InputField
                label="Número de casa *"
                name="numero"
                register={register}
                errors={errors}
                placeholder="Número de casa *"
                required
              />
            </div>
            <div className="md:w-[48.7%] w-full">
              <InputField
                label="Piso/ Dpto / Lote (Opcional)"
                name="piso"
                register={register}
                errors={errors}
                placeholder="Piso/ Dpto / Lote (Opcional)"
              />
            </div>
          </div>
          <br />
          <div className="flex flex-wrap gap-7">
            <div className="md:w-[48.7%] w-full">
              <InputField
                label="Código postal *"
                name="codigoPostal"
                register={register}
                errors={errors}
                placeholder="Código postal *"
                required
              />
            </div>
            <div className="md:w-[48.7%] w-full ">
              <InputField
                label="Localidad *"
                name="localidad"
                register={register}
                errors={errors}
                placeholder="Localidad *"
                required
              />
            </div>
          </div>
          <br />
          <InputField
            label="Email *"
            name="email"
            register={register}
            errors={errors}
            placeholder="Email *"
            type="email"
            required
          />
          <br />
          <InputField
            label="País *"
            name="country"
            register={register}
            errors={errors}
            placeholder="País *"
            required
          />
          <br />
          <InputField
            label="Provincia *"
            name="provincia"
            register={register}
            errors={errors}
            placeholder="Provincia *"
            required
          />
          <br />
          <InputField
            label="Número de teléfono *"
            name="telefono"
            register={register}
            errors={errors}
            placeholder="Número de teléfono *"
            required
          />
          <br />
        </div>
      </div>
      <br className="mb-10" />
      <div className="w-full justify-center mx-auto gap-4 bg-primary p-8 rounded-xl">
        <InputField
          label="Comentarios (Opcional)"
          name="comentarios"
          register={register}
          errors={errors}
          placeholder="Comentarios (Opcional)"
        />
        <br />
        <span>
          Ingrese el número de su DNI (para la factura)
          <InputField
            label="DNI"
            name="dni"
            register={register}
            errors={errors}
            placeholder="DNI"
          />
        </span>
      </div>
      <br className="mb-10" />
    </>
  );
}

export default FormCheckout;
