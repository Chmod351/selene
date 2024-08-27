import React, { useState, useEffect } from "react";
import SlidingPane from "react-sliding-pane";
import SubmitButton from "@/components/Ui/SubmitButton";
import RadioSelected from "@/components/Ui/RadioSelected";
// context
import EcommerceContext from "@/store/store";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
// hooks
import { useContext } from "react";
import useIsMobile from "@/hooks/useIsMobile";
// types

//const
initMercadoPago(process.env.NEXT_PUBLIC_KEY || "");
const mp = "MERCADO PAGO";
const transfer = "TRANSFERENCIA";

function PaymentMethod() {
  const { isMobile, isModalOpen, setIsModalOpen } = useIsMobile();
  const { setUserData, userData, total, createOrder } =
    useContext(EcommerceContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState<Error | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setIsErr(null);
      setIsLoading(true);
      const id = createOrder();
      console.log(id);
      setOrderId(id);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setIsErr(error.message);
    }
  };

  useEffect(() => {
    if (userData.paymentMethod === transfer || userData.paymentMethod === mp) {
      setIsModalOpen((prevState) => !prevState);
    }
  }, [userData.paymentMethod, setIsModalOpen]);

  return (
    <section className="md:w-full w-11/12 max-w-4xl mx-auto justify-center items-center flex flex-col gap-4 mt-28">
      <h1 className="md:text-3xl font-bold font-helvetica mb-8 text-2xl text-center">
        Selecciona un Método de Pago
      </h1>
      <RadioSelected
        fieldChecked={userData.paymentMethod}
        paymentMethodText={mp}
        isSelected={userData.paymentMethod === mp}
        onChangeChecked={(value) =>
          setUserData({ ...userData, paymentMethod: value })
        }
      />
      <RadioSelected
        fieldChecked={userData.paymentMethod}
        paymentMethodText={transfer}
        isSelected={userData.paymentMethod === transfer}
        onChangeChecked={(value) =>
          setUserData({ ...userData, paymentMethod: value })
        }
      />
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consetetur
        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet.
      </p>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.
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
          {isLoading ? (
            <div className="flex flex-col gap-4">loading</div>
          ) : (
            isErr && <div className="flex flex-col gap-4">{isErr.message}</div>
          )}
          {!isLoading &&
          !isErr &&
          !orderId &&
          userData.paymentMethod &&
          userData.paymentMethod === mp ? (
            <CardPayment
              initialization={{
                amount: total,
              }}
              onSubmit={async (data) => {
                if (data && data.token) {
                  console.log(data);
                  handlePayment();
                }
              }}
            />
          ) : (
            !isLoading &&
            !isErr &&
            userData.paymentMethod === transfer && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-center m-auto items-center gap-4">
                  <div className="w-24 h-24 bg-gray-400 animate-pulse rounded-full"></div>
                </div>
                <p>
                  Luego de generar el numero de orden, tendrás dos horas para
                  enviar por email el comprobante de pago
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
                  onClick={handlePayment}
                  type="button"
                  disabled={isLoading || orderId ? true : false}
                />
                <br />
                <p className="text-sm text-gray-400">
                  las transferencias no son reembolsables Tenes que enviar el
                  comprobante en un plazo de 2hs o el pedido se cancela
                  automaticamente Gracias por tu compra!
                </p>
              </div>
            )
          )}
        </SlidingPane>
      </div>
    </section>
  );
}

export default PaymentMethod;
