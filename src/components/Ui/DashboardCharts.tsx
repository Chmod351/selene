import ApexCharts from "apexcharts";
import React, { useEffect, useRef } from "react";
import { Product, Stock } from "@/components/Ui/types";

function ProductStockChartComponent({ stockData }: { stockData: Product[] }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && chartRef.current && chartRef.current) {
      const chart = new ApexCharts(chartRef.current, {
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
      });
      chart.render();
      return () => {
        chart.destroy();
      };
    } else {
      return () => {};
    }
  }, [stockData]);

  return (
    <div className="w-full flex flex-row">
      <div ref={chartRef} id="chart" className="h-80 w-full "></div>
    </div>
  );
}

export default ProductStockChartComponent;
