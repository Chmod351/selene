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

export type Sizes =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "XXXL"
  | "XXXXL"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31"
  | "32"
  | "33"
  | "34"
  | "35"
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41"
  | "42"
  | "43"
  | "44"
  | "45"
  | "46"
  | "47"
  | "48";
