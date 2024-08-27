import { createContext } from "react";
export interface DataProps {
  firstName: string;
  lastName: string;
  floor: string;
  shippingAddress1: string;
  city: string;
  commentaries: string;
  deliveryMode: string;
  country: string;
  email: string;
  phoneNumber: string;
  state: string;
  userIdCard: string;
  zip: string;
  paymentMethod: string;
}

const EcommerceContext = createContext({
  // cart functions
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  clearCart: () => {},
  createOrder: () => {},
  cart: [],
  total: 0,

  // user form information
  setUserData: (data: DataProps) => {},
  userData: {
    firstName: "",
    lastName: "",
    floor: "",
    shippingAddress1: "",
    city: "",
    commentaries: "",
    deliveryMode: "",
    country: "",
    email: "",
    phoneNumber: "",
    state: "",
    userIdCard: "",
    zip: "",
    paymentMethod: "",
  },
});

export default EcommerceContext;
