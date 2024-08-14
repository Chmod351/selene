const checkoutFormData = [
  {
    type: "text",
    name: "firstName",
    label: "Nombre",
    placeholder: "Nombre *",
    required: true,
  },
  {
    type: "text",
    name: "lastName",
    label: "Apellido",
    placeholder: "Apellido *",
    required: true,
  },
  {
    type: "number",
    name: "houseNumber",
    label: "Numero de casa",
    placeholder: "Numero ",
    required: false,
  },
  {
    type: "text",
    name: "floor",
    label: "Piso/Dpto",
    placeholder: "Piso/Dpto",
    required: false,
  },
  {
    type: "text",
    name: "address",
    label: "Dirección",
    placeholder: "Dirección",
    required: true,
  },
  {
    type: "text",
    name: "city",
    label: "City",
    placeholder: "Enter your city",
    required: true,
  },
  {
    type: "text",
    name: "state",
    label: "State",
    placeholder: "Enter your state",
    required: true,
  },
  // country let's only shows 3 random countries
  {
    type: "select",
    name: "country",
    label: "Country",
    options: [
      { value: "usa", label: "USA" },
      { value: "canada", label: "Canada" },
      { value: "mexico", label: "Mexico" },
    ],
    required: true,
  },
  {
    type: "number",
    name: "zip",
    label: "Zip",
    placeholder: "Enter your zip code",
    required: true,
  },
  {
    type: "text",
    name: "phone",
    label: "Phone",
    defaultValue: "123-456-7890",
    placeholder: "Enter your phone number",
    required: true,
  },

  // button
  {
    type: "button",
    name: "submit",
    label: "PASAR AL PAGO",
    onClick: () => {},
  },
];
export default checkoutFormData;
