import { createContext } from "react";

const EcommerceContext = createContext({
  // cart functions
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  clearCart: () => {},
  checkout: () => {},
  cart: [],
  total: 0,

  // user form information
  firstName: "",
  setFirstName: (name) => {},
  lastName: "",
  setLastName: (name) => {},
  houseNumber: "",
  setHouseNumber: (number) => {},
  floor: "",
  setFloor: (floor) => {},
  phoneNumber: "",
  setPhoneNumber: (phone) => {},
  address: "",
  setAddress: (address) => {},
  city: "",
  setCity: (city) => {},
  state: "",
  setState: (state) => {},
  country: "",
  setCountry: (country) => {},
  zipCode: "",
  setZipCode: (zip) => {},
  email: "",
  setEmail: (email) => {},
  dni: "",
  setDni: (dni) => {},
});

export default EcommerceContext;
