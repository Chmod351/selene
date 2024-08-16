import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProps } from "@/components/FormComponents/types";
import checkFormSchema from "@/components/FormComponents/checkoutFormSchema";
// components
import InputField from "./Input";
import SelectField from "./Select";
import SubmitButton from "@/components/Ui/SubmitButton";

export default function Form({
  fields,
  setIsCheckoutForm,
  onSubmit,
}: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkFormSchema),
  });
  const onSubmitHandler = (data: any) => {
    onSubmit(data); // Llama a la prop onSubmit aquí
  };

  return (
    <div className="w-full bg-white flex flex-col justify-between m-auto rounded-xl items-center h-full mt-28 mb-10">
      {/* retiro de pedido*/}
      <div className="w-full  my-10 bg-primary">
        <div className="w-11/12 flex justify-evenly  flex-col  mx-auto py-8">
          <label className=" font-helvetica ">
            <input type="radio" className="mr-2 " />
            Retirar por sucursal de correo
          </label>
          <label className="font-helvetica ">
            <input type="radio" className="mr-2" />
            Envio estandar a domicilio
          </label>
          <label className=" font-helvetica ">
            <input type="radio" className="mr-2" />
            moto mensajeria 24 hs - caba
          </label>
          <label className=" font-helvetica ">
            <input type="radio" name="radio" value="" className="mr-2" />
            moto mensajeria 24 hs - GBA
          </label>
        </div>
      </div>

      <div className="w-full bg-white flex flex-col justify-between m-auto h-auto rounded-xl ">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex flex-col w-full py-10 bg-primary  "
        >
          <div className="w-11/12  justify-center mx-auto ">
            <h1 className="text-2xl font-bold text-center mb-10 font-helvetica">
              Direccion de envio (* Obligatoria)
            </h1>

            {fields.map((field, index) => {
              switch (field.type) {
                case "text":
                  return (
                    <InputField
                      key={index}
                      errors={errors[field.name]?.message}
                      label={field.label}
                      name={field.name}
                      placeholder={field.placeholder}
                      defaultValue={field.defaultValue}
                      required={field.required}
                      register={register}
                      type={field.type}
                      value={field.value}
                    />
                  );
                case "number":
                  return (
                    <InputField
                      key={index}
                      errors={errors[field.name]?.message}
                      label={field.label}
                      name={field.name}
                      placeholder={field.placeholder}
                      defaultValue={field.defaultValue}
                      required={field.required}
                      register={register}
                      type={field.type}
                      value={field.value}
                    />
                  );
                case "select":
                  return (
                    <SelectField
                      key={index}
                      defaultValue={field.defaultValue}
                      errors={errors[field.name]?.message}
                      label={field.label}
                      name={field.name}
                      value={field.value}
                      options={field.options}
                      onChange={(e) => field.onChange(e.target.value)}
                      register={register}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
          <div className="w-full my-10  bg-white h-10" />
          <div className="w-11/12  justify-center mx-auto bg-primary py-2 rounded-xl">
            <InputField
              defaultValue=""
              label="DNI"
              onChange={(e) => console.log(e.target.value)}
              required
              register={register}
              errors=""
              name="clientId"
              placeholder="DNI"
              type="number"
            />
          </div>
          <div className="w-11/12  justify-center mx-auto bg-primary py-2 rounded-xl">
            <SubmitButton
              type="submit"
              label="PASAR AL PAGO"
              disabled={false}
              onClick={() => setIsCheckoutForm(false)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
