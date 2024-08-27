import { IProduct } from "@/components/ProductComponents/types";
interface OrderItems {
  productId: IProduct;
  productPrice: number;
  quantity: number;
  color: string;
  size: string;
}

export interface IOrder {
  commentaries: string;
  deliveryMode: string;
  orderItems: [OrderItems];
  shippingAddress1: string;
  shippingAddress2: string;
  paymentMethod: string;
  paymentStatus: "Pending" | "Failed" | "Success";
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalPrice: number;
  userData: {
    city: string;
    country: string;
    dateOrdered: Date;
    email: string;
    name: string;
    phone: string;
    phone2: string;
    surname: string;
    zip: string;
  };
}
