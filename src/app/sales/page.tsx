"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ErrorScreen from "@/components/Ui/ErrorScreen";

interface UserData {
  city: string;
  country: string;
  dateOrdered: string;
  email: string;
  floor: string;
  name: string;
  phone: string;
  state: string;
  surname: string;
  userIdCard: string;
  zip: string;
}

interface OrderItem {
  _id: string;
  color: string;
  productPrice: number;
  quantity: number;
  size: string;
}

interface Order {
  _id: string;
  deliveryMode: string;
  orderItems: OrderItem[];
  paymentId: string | null;
  paymentMethod: string;
  paymentStatus: "Pending" | "Failed" | "Success";
  shippingAddress1: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalPrice: number;
  userData: UserData;
  __v: number;
}

interface Response {
  data: Order[];
  totalItems: number;
  totalPages: number;
}
async function getOrders() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/orders`);
    if (res.status !== 200) {
      throw new Error("Error fetching data");
    }
    const data: Response = await res.json();
    return data.data;
  } catch (e) {
    /* handle error */
    console.log(e);
  }
}

function StatusColorBottom({ status }: { status: string }) {
  if (status === "Pending") {
    return (
      <span className="bg-yellow-500 p-2 text-black font-bold rounded">
        {status}
      </span>
    );
  }
  if (status === "Cancelled") {
    return (
      <span className="bg-red-500 p-2 text-white font-bold rounded">
        {status}
      </span>
    );
  }
  if (status === "Shipped") {
    return (
      <span className="bg-green-500 p-2 text-white font-bold rounded">
        {status}{" "}
      </span>
    );
  }
  if (status === "Delivered") {
    return (
      <span className="bg-blue-500 p-2 text-white font-bold rounded">
        {status}{" "}
      </span>
    );
  }
  if (status === "Processing") {
    return (
      <span className="bd-yellow-500 p-2 text-white font-bold rounded">
        {status}{" "}
      </span>
    );
  }
  if (status === "Success") {
    return (
      <span className="bg-green-500 p-2 text-white font-bold rounded">
        {status}{" "}
      </span>
    );
  }
  if (status === "Failed") {
    return (
      <span className="bg-red-500 p-2 text-white font-bold rounded">
        {status}{" "}
      </span>
    );
  }
  return <span>{status} </span>;
}

function Sales() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div className="text-3xl animate-pulse h-screen"></div>;
  }
  if (error) {
    return <ErrorScreen />;
  }
  return (
    <main className="w-full h-full flex flex-col items-center justify-center mx-auto mt-32 mb-10">
      <section className="container ">
        {data &&
          data.map((item: Order) => {
            return (
              <div
                key={item._id}
                className="w-full p-2 flex flex-col h-28 m-auto items-center justify-center "
              >
                <div className="w-full flex flex-row justify-between m-auto items-center">
                  <div>
                    <p className="my-2 font-bold">orden Id:</p>
                    <p className="w-[200px]">{item._id}</p>
                  </div>

                  <div>
                    <p className="my-2 font-bold">Usuario:</p>
                    <span className="w-[100px] flex flex-row">
                      <p className="mr-2">{item.userData.name}</p>
                      <p className="ml-2">{item.userData.surname}</p>
                    </span>
                  </div>
                  <div>
                    <p className="my-2 font-bold">Total a pagar:</p>
                    <p>${item.totalPrice}</p>
                  </div>
                  <div>
                    <p className="my-2 font-bold">Orden Status</p>
                    <StatusColorBottom status={item.status} />
                  </div>
                  <div>
                    <p className="my-2 font-bold">Pago Status</p>
                    <StatusColorBottom status={item.paymentStatus} />
                  </div>
                  <div>
                    <p className="my-2 font-bold">Metodo de entrega</p>
                    <p>{item.deliveryMode}</p>
                  </div>
                </div>
                <span className="w-full h-[1px] bg-gray-800" />
              </div>
            );
          })}{" "}
      </section>
    </main>
  );
}

export default Sales;
