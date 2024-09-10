export interface IOrder {
  commentaries: string;
  deliveryMode: string;
  orderItems: [
    {
      _id: string;
      price_es: number;
      price_en: number;
      name_es: string;
      name_en: string;
      description_es: string;
      description_en: string;
      productPrice: number;
      quantity: number;
      color: string;
      size: string;
    },
  ];
  shippingAddress1: string;
  shippingAddress2: string;
  paymentMethod: string;
  paymentStatus: "Pending" | "Failed" | "Success";
  // status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalPrice: number;
  userData: {
    city: string;
    country: string;
    dateOrdered: Date;
    email: string;
    name: string;
    phone: string;
    // phone2: string;
    surname: string;
    zip: string;
  };
}
