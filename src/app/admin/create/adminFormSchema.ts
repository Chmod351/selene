import { z } from "zod";

const productCreationSchema = z.object({
  category: z
    .string({ required_error: "Categorias requeridas" })
    .min(1, { message: "Categorias requeridas" }),
  seasson: z
    .string({ required_error: "Temporada requerida" })
    .min(1, { message: "Temporada requerida" }),
  description_en: z
    .string({ required_error: "Descripicion en ingles requerida" })
    .min(100, { message: "Debe de ser un minimo de 100 caracteres" })
    .max(500, { message: "Debe de ser un maximo de 500 caracteres" }),
  description_es: z
    .string({ required_error: "Descripicion en Español requerida" })
    .min(100, { message: "Debe de ser un minimo de 100 caracteres" })
    .max(500, { message: "Debe de ser un maximo de 500 caracteres" }),
  name_en: z
    .string({ required_error: "Nombre en ingles requerido" })
    .min(10, {
      message: "Nombre en ingles debe ser un minimo de 10 caracteres",
    })
    .max(50, {
      message: "Nombre en Español debe ser un maximo de 50 caracteres",
    }),
  name_es: z
    .string({ required_error: "Nombre en Español requerido" })
    .min(10, { message: "Nombre en Español requerido" })
    .max(50, {
      message: "Nombre en Español debe ser un maximo de 50 caracteres",
    }),
  price_en: z
    .string({ required_error: "Precio en dolares requerido" })
    .min(1, { message: "Precio en dolares requerido" })
    .max(999999999, { message: "Debe de ser un maximo de 999999999" }),
  price_es: z
    .string({ required_error: "Precio en pesos requerido" })
    .min(1, { message: "Precio en pesos requerido" })
    .max(999999999, { message: "Debe de ser un maximo de 999999999" }),
  image0: z
    .string({ required_error: "Imagen requerida" })
    .min(1, { message: "Imagen requerida" })
    .max(2000, { message: "Debe de ser un maximo de 500 caracteres" }),
  image1: z
    .string({ required_error: "Imagen requerida" })
    .min(1, { message: "Imagen requerida" })
    .max(2000, { message: "Debe de ser un maximo de 500 caracteres" }),
  image2: z
    .string({ required_error: "Imagen requerida" })
    .min(1, { message: "Imagen requerida" })
    .max(2000, { message: "Debe de ser un maximo de 500 caracteres" }),
  image3: z
    .string({ required_error: "Imagen requerida" })
    .min(1, { message: "Imagen requerida" })
    .max(2000, { message: "Debe de ser un maximo de 500 caracteres" }),
  weight: z
    .string({ required_error: "Peso requerido" })
    .min(1, { message: "Peso requerido" })
    .max(9999999999, { message: "Debe de ser un maximo de 9999999999" }),
  stock: z.array(
    z.object({
      provider: z
        .string({ required_error: "Provider requerido" })
        .min(1, { message: "Provider requerido" }),
      provider_cost: z
        .string({ required_error: "Provider Coste requerido" })
        .min(1, { message: "Provider Coste requerido" }),
      color: z
        .string({ required_error: "Color requerido" })
        .min(1, { message: "Color requerido" }),
      size: z
        .string({ required_error: "Talla requerida" })
        .min(1, { message: "Talla requerida" }),
      quantity: z
        .string({ required_error: "Stock requerido" })
        .min(1, { message: "Stock requerido" }),
    }),
  ),
});

export default productCreationSchema;
