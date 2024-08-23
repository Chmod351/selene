export interface IProduct {
  _id: any;
  name_es: string;
  name_en: string;
  description_es: string;
  description_en: string;
  image_url: [string];
  price_es: number;
  price_en: number;
  category: string;
  seasson: string;
  stock: [
    {
      color: [string];
      provider: string;
      providerCost: number;
      quantity: number;
      size: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "XXXL",
        "XXXXL",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
      ];
    },
  ];
  weight: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id: any;
  username: string;
  password: string;
  email: string;
  type: "admin" | "customer";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserBody {
  email: string;
  password: string;
  username: string;
}

interface OrderItems {
  productId: IProduct;
  productPrice: number;
  quantity: number;
}

export interface IOrder {
  _id: any;
  products: [OrderItems];
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
