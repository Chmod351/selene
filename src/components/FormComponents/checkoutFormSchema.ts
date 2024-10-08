import { z } from "zod";

// Esquema de validación general para la orden
const checkoutFormSchema = z.object({
  commentaries: z.string().optional(),
  deliveryMode: z
    .string()
    .min(1, { message: "El modo de entrega es requerido" }),
  shippingAddress1: z
    .string()
    .min(1, { message: "La dirección  es requerida" }),
  city: z.string().min(1, { message: "La ciudad es requerida" }),
  country: z.string().min(1, { message: "El país es requerido" }),
  state: z.string().min(1, { message: "El estado/provincia es requerido" }),
  email: z.string().email({ message: "Debe ser un email válido" }),
  firstName: z.string().min(1, { message: "El nombre es requerido" }),
  lastName: z.string().min(1, { message: "El apellido es requerido" }),
  floor: z.string().optional(),
  phoneNumber: z.string().min(1, { message: "El telefón es requerido" }),
  userIdCard: z
    .string({ required_error: "El DNI es requerido" })
    .min(1, { message: "El DNI es requerido" }),
  zip: z.string().min(1, { message: "El código postal es requerido" }),
});

export default checkoutFormSchema;
