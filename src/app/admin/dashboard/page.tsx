"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SaleOverviewItem, Product } from "@/components/Ui/types";
import dynamic from "next/dynamic";

type SaleOverview = SaleOverviewItem[];

export default Dashboard;

async function getDashboardData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API}/orders/monthly-sales`,
  );
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  const data: SaleOverview = await res.json();
  return data;
}

const DashboardChartsWithNoSSR = dynamic(
  () => import("@/components/Ui/DashboardCharts"),
  { ssr: false },
);

async function getStockFromAllProducts() {
  const res: Product[] = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API}/products/stock`,
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return res;
}
function Dashboard() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });
  const { data: stockData } = useQuery({
    queryKey: ["stock"],
    queryFn: getStockFromAllProducts,
  });

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }

  const totalItemsSold =
    data && data.reduce((total, item) => total + item.orderItems.length, 0);

  const totalCashEarned =
    data &&
    data.reduce(
      (total, item) =>
        total + item.orderItems.reduce((a, b) => a + b.productPrice, 0),
      0,
    );

  const totalProvideerCost =
    data &&
    data.reduce(
      (total, item) =>
        total +
        item.orderItems.reduce(
          (a, b) =>
            a +
            b.stockInfo.reduce((c, d) => c + d.providerCost * d.quantity, 0),
          0,
        ),
      0,
    );
  const totalCost =
    totalCashEarned &&
    totalProvideerCost &&
    totalCashEarned - totalProvideerCost;

  return (
    <section className="flex flex-col  h-screen mt-32 ">
      <div className="flex flex-col container justify-end m-auto">
        <div className="bg-primary p-4 rounded-lg w-1/3">
          <div>
            <strong>Total vendidos este mes:</strong> {totalItemsSold} items{" "}
            <br />
          </div>
          <div>
            <strong> Total recaudado:</strong> ${totalCashEarned}
          </div>
          <div>
            <strong>Total Costo de proveedor: ${totalProvideerCost}</strong>
          </div>
          <div>
            <strong>Total Costo: ${totalCost}</strong>
          </div>
        </div>
        {data && data.map((item) => <div key={item._id}></div>)}
      </div>
      <div className=" container m-auto overflow-x-auto h-[2000px]">
        <div className="w-full flex flex-row m-auto">
          {stockData && <DashboardChartsWithNoSSR stockData={stockData} />}
        </div>
      </div>
    </section>
  );
}
