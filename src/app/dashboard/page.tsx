"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
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

type SaleOverview = SaleOverviewItem[];

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

function Dashboard() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
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
  return (
    <div className="flex flex-col items-center h-screen mt-40">
      {data.map((item) => (
        <div key={item._id}>
          <p>{item._id}</p>
          <p>{item.orderItems.length}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
