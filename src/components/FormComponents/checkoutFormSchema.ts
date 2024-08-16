import { z } from "zod";
// i needs to validate string only with letters
const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(20)
    .regex(/^[a-zA-Z]+$/),
  lastName: z
    .string()
    .min(1, { message: "El apellido es requerido" })
    .max(20)
    .regex(/^[a-zA-Z]+$/),
  houseNumber: z.number().optional(),
  floor: z
    .string()
    .regex(/^[a-zA-Z0-9\s,'-]+$/)
    .optional(),
  phoneNumber: z
    .string()
    .min(10, { message: "Número de teléfono debe tener al menos 10 dígitos" })
    .regex(/^[0-9]+$/),
  address: z
    .string()
    .min(1, { message: "Dirección es requerida" })
    .regex(/^[a-zA-Z0-9\s,'-]+$/),
});
export default checkoutFormSchema;
