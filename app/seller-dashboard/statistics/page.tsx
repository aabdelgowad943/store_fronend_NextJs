"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchStatisticsBySellerId } from "@/utils/actions";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Statistics() {
  const [stats, setStats] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStatistics = async () => {
      const sellerId = localStorage.getItem("sellerId");
      if (!sellerId) {
        setError("Seller ID not found in local storage.");
        return;
      }
      try {
        const data = await fetchStatisticsBySellerId(sellerId);
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Prepare chart data
  const labels = stats.map((stat) => `Seller: ${stat.sellerId}`);
  const totalSalesData = stats.map((stat) => stat.totalSales);
  const totalEarningsData = stats.map((stat) => stat.totalEarnings);

  const chartData = {
    labels, // X-axis labels
    datasets: [
      {
        label: "Total Sales",
        data: totalSalesData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Earnings",
        data: totalEarningsData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Seller Statistics Overview",
      },
    },
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8 p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Statistics Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Bar data={chartData} options={options} />
      </CardContent>
    </Card>
  );
}

export default Statistics;
