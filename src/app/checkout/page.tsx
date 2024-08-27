"use client";
import Form from "@/components/FormComponents/Form";
import FormCheckout from "@/components/FormComponents/FormCheckout";
import RadioSelected from "@/components/Ui/RadioSelected";
import { useState, useEffect } from "react";
import { useContext } from "react";
import EcommerceContext from "@/store/store";
import SlidingPane from "react-sliding-pane";
import SubmitButton from "@/components/Ui/SubmitButton";
import { IOrder } from "@/components/Ui/types";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import useIsMobile from "@/hooks/useIsMobile";

const url = "http://localhost:4000/api/v1/orders/create";

const createOrder = async ({
  total,
  userData,
  cart,
}: {
  total: number;
  userData: any;
  cart: any;
}) => {
  try {
    const requestBody: IOrder = {
      orderItems: cart,
      totalPrice: total,
      deliveryMode: userData.deliveryMode,
      paymentMethod: userData.paymentMethod,
      shippingAddress1: userData.shippingAddress1,
      userData: {
        ...userData,
        surname: userData.lastName,
        name: userData.firstName,
        dateOrdered: new Date(),
      },
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Error creating order");
    }
    const result = await response.json();
    localStorage.clear();
    return result;
  } catch (e) {
    /* handle error */
    console.log(e);
  }
};

export default function CheckoutPage() {
  initMercadoPago("TEST-67887a30-bd16-4aad-82cd-15bd779c3006");
  const { isMobile, isModalOpen, setIsModalOpen } = useIsMobile();
  const [isCheckoutForm, setIsCheckoutForm] = useState<boolean>(true);
  const { setUserData, userData, total, cart, clearCart } =
    useContext(EcommerceContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState<Error | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  useEffect(() => {
    if (
      userData.paymentMethod === "TRANSFERENCIA" ||
      userData.paymentMethod === "MERCADO PAGO"
    ) {
      setIsModalOpen((prevState) => !prevState);
    }
  }, [userData.paymentMethod, setIsModalOpen]);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  });
  return (
    <main className="container m-auto min-h-screen flex justify-center items-center  flex-col mt-10">
      {isCheckoutForm ? (
        <Form setIsCheckoutForm={setIsCheckoutForm}>
          <FormCheckout />
        </Form>
      ) : (
        <section className="md:w-full w-11/12 max-w-4xl mx-auto justify-center items-center flex flex-col gap-4 mt-28">
          <h1 className="md:text-3xl font-bold font-helvetica mb-8 text-2xl text-center">
            Selecciona un Método de Pago
          </h1>
          <RadioSelected
            fieldChecked={userData.paymentMethod}
            paymentMethodText="MERCADO PAGO"
            isSelected={userData.paymentMethod === "MERCADO PAGO"}
            onChangeChecked={(value) =>
              setUserData({ ...userData, paymentMethod: value })
            }
          />
          <RadioSelected
            fieldChecked={userData.paymentMethod}
            paymentMethodText="TRANSFERENCIA"
            isSelected={userData.paymentMethod === "TRANSFERENCIA"}
            onChangeChecked={(value) =>
              setUserData({ ...userData, paymentMethod: value })
            }
          />
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur
            adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <div className="md:w-[400px] w-full h-[120px] mt-8">
            <SlidingPane
              className="z-40"
              closeIcon={<div>X</div>}
              isOpen={isModalOpen}
              title=""
              width={isMobile ? "100%" : "700px"}
              onRequestClose={() => setIsModalOpen(false)}
            >
              {userData.paymentMethod &&
              userData.paymentMethod === "MERCADO PAGO" ? (
                <CardPayment
                  initialization={{
                    amount: total,
                  }}
                  onSubmit={async () => {}}
                />
              ) : userData.paymentMethod === "TRANSFERENCIA" ? (
                isLoading ? (
                  <div className="flex flex-col gap-4">loading</div>
                ) : isErr ? (
                  <div className="flex flex-col gap-4">{isErr.message}</div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-center m-auto items-center gap-4">
                      <div className="w-24 h-24 bg-gray-400 animate-pulse rounded-full"></div>
                    </div>
                    <p>
                      Luego de generar el numero de orden, tendrás dos horas
                      para enviar por email el comprobante de pago
                    </p>
                    <h1>ALIAS: LAZY.TRENDY</h1>
                    <br />
                    <a
                      href="mailto:lazytrendy@tienda.com.ar"
                      target="_blank"
                      className="text-xl font-bold "
                    >
                      email:lazytrendy@tienda.com.ar
                    </a>
                    <br />
                    <strong className="text-3xl">
                      {!orderId ? (
                        <>TOTAL A PAGAR : $ {total}</>
                      ) : (
                        <> ESTE ES TU NUMERO DE ORDEN : {orderId}</>
                      )}
                    </strong>

                    <SubmitButton
                      label={`GENERAR ORDEN POR:$ ${total}`}
                      onClick={async () => {
                        try {
                          setIsLoading(true);
                          const orderData = await createOrder({
                            total,
                            userData,
                            cart,
                          });
                          // Por ejemplo, cerrar el modal, mostrar un mensaje de éxito, etc.
                          setOrderId(orderData._id);
                          setIsLoading(false);
                          clearCart();
                        } catch (error) {
                          setIsLoading(false);
                          console.error(error);
                          setIsErr(error.message);
                          // Manejar errores aquí, por ejemplo, mostrar un mensaje de error
                        }
                      }}
                      type="button"
                      disabled={isLoading || orderId ? true : false}
                    />
                    <br />
                    <p className="text-sm text-gray-400">
                      las transferencias no son reembolsables Tenes que enviar
                      el comprobante en un plazo de 2hs o el pedido se cancela
                      automaticamente Gracias por tu compra!
                    </p>
                  </div>
                )
              ) : null}
            </SlidingPane>
          </div>
        </section>
      )}
    </main>
  );
}
