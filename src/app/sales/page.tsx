"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import ErrorScreen from "@/components/Ui/ErrorScreen";
import SlidingPane from "react-sliding-pane";
import useIsMobile from "@/hooks/useIsMobile";
import SubmitButton from "@/components/Ui/SubmitButton";

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
    return data;
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [item, setItem] = useState<Order | null>(null);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const { isMobile, isModalOpen, setIsModalOpen } = useIsMobile();
  const { isLoading, data, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (data && !isLoading) {
      // @ts-ignore
      setOrders((prevArr) => [...prevArr, ...data.data]);
    }
  }, [data, isLoading]);

  const goToNextPage = () => {
    if (currentPage < (data?.totalPages ?? 0) && !isLoading) {
      setCurrentPage(currentPage + 1);
    }
  };
  if (isLoading) {
    return (
      <div className="text-3xl animate-pulse h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return <ErrorScreen />;
  }

  const passIOtemToPanel = (item: Order) => {
    setItem(item);
    setIsModalOpen(true);
  };

  const updateOrderStatus = async (
    id: string,
    s: string,
    paymentMethod: string,
    paymentId: string | null,
  ) => {
    setMsg("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API}/orders/update`,
        {
          method: "PUT",
          body: JSON.stringify({ id, status: s, paymentMethod, paymentId }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status !== 200) {
        console.log(res);
        throw new Error(res.statusText);
      }
      const data: Response = await res.json();
      console.log(data);
      setMsg("Status updated successfully");
      return data;
    } catch (e) {
      /* handle error */
      setMsg("Error updating status");
      console.log(e);
    }
  };
  return (
    <>
      <main className="w-full h-full flex flex-col items-center justify-center mx-auto mt-32 mb-10">
        <section className="container ">
          {orders &&
            orders.map((item: Order) => {
              return (
                <div
                  onClick={() => passIOtemToPanel(item)}
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
            })}
        </section>
        {orders.length < (data?.totalItems ?? 0) && (
          <div className="flex flex-col items-center my-10 ">
            <span className="text-gray-400 font-helvetica">
              {orders.length} of {data?.totalItems} orders
            </span>
            <button onClick={goToNextPage} className="mt-4">
              Ver los siguientes pedidos
            </button>
          </div>
        )}
      </main>
      {item && (
        <SlidingPane
          closeIcon={<div>X</div>}
          isOpen={isModalOpen}
          title={item._id}
          onRequestClose={() => setIsModalOpen(false)}
          width={isMobile ? "100%" : "50%"}
        >
          <>
            <div className="p-4 bg-primary">
              <p className="my-2 font-bold">orden Id:</p>
              <p className="w-[200px]">{item._id}</p>
              <div>
                <p className="my-2 font-bold">Dia de la orden</p>
                <p> {item?.userData?.dateOrdered}</p>
              </div>
            </div>

            <div>
              <div className="my-4 bg-primary p-4">
                <strong>Domicilio de entrega y metodo de entrega</strong>
                <div>
                  <div className="flex flex-row justify-between m-auto items-center">
                    <strong>Delivery Mode</strong>
                    <p>{item?.deliveryMode}</p>
                  </div>
                  <div className="flex flex-row justify-between m-auto items-center">
                    <strong>Shipping Address</strong>
                    <p>{item?.shippingAddress1}</p>
                  </div>
                  <div className="flex flex-row justify-between m-auto items-center">
                    <strong>Nombre:</strong>
                    <p>{item.userData.name}</p>
                  </div>
                  <div className="flex flex-row justify-between m-auto items-center">
                    <strong>Apellido:</strong>
                    <p>{item.userData.surname}</p>
                  </div>
                  <div className="flex flex-row justify-between m-auto items-center">
                    <strong>Ciudad:</strong>
                    <p>{item?.userData.city}</p>
                  </div>
                  <div className="flex flex-row justify-between m-auto items-center">
                    <strong>CP:</strong>
                    <p>{item?.userData.zip}</p>
                  </div>
                  <div className="flex flex-row justify-between m-auto items-center">
                    <strong>Pais:</strong>
                    <p>{item?.userData.country}</p>
                  </div>
                  <div className="flex flex-row justify-between m-auto items-center">
                    <strong>Telefono:</strong>
                    <p>{item?.userData.phone}</p>
                  </div>
                  <div className="flex flex-row justify-between m-auto items-center">
                    <strong>Email:</strong>
                    <p>{item?.userData.email}</p>
                  </div>
                  <div className="flex flex-row justify-between m-auto items-center">
                    <strong>Provincia:</strong>
                    <p>{item?.userData.state}</p>
                  </div>
                </div>
                <div className="flex flex-row justify-between m-auto items-center">
                  <strong>Payment Method</strong>
                  <p>{item?.paymentMethod}</p>
                </div>
              </div>

              <div className="p-4 bg-primary">
                <p className=" font-bold">Items ordenados</p>
                {item?.orderItems?.map((i) => {
                  return (
                    <div key={i?._id}>
                      <div className="flex flex-row justify-between m-auto items-center">
                        <div>
                          <p className="my-2 font-bold">Product Name:</p>
                          <p className="w-[200px]">{i?._id}</p>
                        </div>
                        <div>
                          <p className="my-2 font-bold">Size:</p>
                          <p>{i?.size}</p>
                        </div>
                        <div>
                          <p className="my-2 font-bold">Color:</p>
                          <p>{i?.color}</p>
                        </div>
                        <div>
                          <p className="my-2 font-bold">Quantity:</p>
                          <p>{i?.quantity}</p>
                        </div>
                        <div>
                          <p className="my-2 font-bold">Price:</p>
                          <p>${i?.productPrice}</p>
                        </div>
                      </div>
                      <div>
                        <p className="my-2 font-bold">Total a pagar:</p>
                        <p>${item.totalPrice}</p>
                      </div>
                      <div>
                        <label className="my-2 font-bold">Orden Status</label>
                        <select
                          defaultValue={item.status}
                          className="p-2"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Cancelled ">Cancelled</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Processing">Processing</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {msg && <p>{msg}</p>}
            <SubmitButton
              label="UPDATE ORDER STATUS"
              onClick={() =>
                updateOrderStatus(
                  item._id,
                  status,
                  item.paymentMethod,
                  item.paymentId,
                )
              }
              disabled={false}
              type="submit"
            />
          </>
        </SlidingPane>
      )}
    </>
  );
}

export default Sales;
