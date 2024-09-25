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
  // eslint-disable-next-line no-unused-vars
  addToCart: (product: any) => {},
  // eslint-disable-next-line no-unused-vars
  removeFromCart: (productId: string) => {},
  clearCart: () => {},
  // eslint-disable-next-line no-unused-vars
  createOrder: (paymentId: string | null) => {},
  cart: [],
  total: 0,

  // user form information
  // eslint-disable-next-line no-unused-vars
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
