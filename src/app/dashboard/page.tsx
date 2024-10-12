"use client";
//eslint-disable
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import ApexCharts from "apexcharts";

type Color = string[];

interface StockInfo {
  color: Color;
  provider: string;
  providerCost: number;
  quantity: number;
  size: string[];
}

interface OrderItem {
  productPrice: number;
  product_id: string;
  quantity: number;
  stockInfo: StockInfo[];
}

interface SaleOverviewItem {
  _id: string;
  orderItems: OrderItem[];
}
interface Stock {
  color: string[];
  provider: string;
  providerCost: number;
  quantity: number;
  size: string[];
  _id: string;
}

interface Product {
  name: string;
  stock: Stock[];
}

type SaleOverview = SaleOverviewItem[];

const ProductStockChart = dynamic(
  () => Promise.resolve(ProductStockChartComponent),
  { ssr: false },
);

export default Dashboard;

let chartElement: any = "chart";
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
          {stockData && <ProductStockChart stockData={stockData} />}
        </div>
      </div>
    </section>
  );
}

function ProductStockChartComponent({ stockData }: { stockData: Product[] }) {
  useEffect(() => {
    const options = {
      colors: ["#FFBDD6", "#111"],
      series: [
        {
          name: "Stock",
          data: stockData.flatMap((product) =>
            product.stock.map((stock: Stock) => ({
              x: product.name,
              y: stock.quantity,
            })),
          ),
        },
        {
          name: "Costo del Proveedor",
          data: stockData.flatMap((product) =>
            product.stock.map((stock) => ({
              x: product.name,
              y: stock.providerCost,
            })),
          ),
        },
      ],
      chart: {
        type: "bar",
        height: 420,
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "100%",
          borderRadiusApplication: "end",
          borderRadius: 8,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      stroke: {
        show: true,
        width: 0,
        colors: ["transparent"],
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -14,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500",
          },
        },
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
    };
    // Aquí se asegura de que 'window' está definido antes de ejecutar el código
    chartElement = document.getElementById("chart");
    if (chartElement) {
      const chart = new ApexCharts(chartElement, options);
      chart.render();
      return () => {
        chart.destroy();
      };
    }
  }, [stockData]);

  return (
    <div className="w-full flex flex-row">
      <div id="chart" className="h-80 w-full "></div>
    </div>
  );
}
