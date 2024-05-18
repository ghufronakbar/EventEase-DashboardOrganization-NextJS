import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { LoadingComponent } from "../LoadingComponent";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function StatisticChartIncomeMonthly({ flex }) {
  const canvasRef = useRef(null);
  
  const {
    data: dataChart,
    isLoading,
    error,
    refetch: refetchDataChart,
  } = useQuery({
    queryKey: ["order/total/income/monthly"],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get(
        "/order/total/income/monthly"
      );
      return dataResponse;
    },
  });

  useEffect(() => {
    let myChart = null;
  
    if (canvasRef.current && dataChart) {
      const ctx = canvasRef.current.getContext("2d");
  
      // Hancurkan grafik sebelumnya jika ada
      if (myChart) {
        myChart.destroy();
      }
  
      myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Total Incomes",
              data: totalIncomeData,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return "Rp " + value.toLocaleString();
                },
                color: "teal",
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Total Incomes per Month",
              font: {
                size: 16,
              },
              color: "teal",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        },
      });
    }
  
    // Hancurkan grafik saat komponen dibongkar
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [dataChart]);
  
  if (isLoading) return <LoadingComponent flex={flex} />;

  if (error) {
    return (
      <Box
        flex={flex}
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mt={4}
        mx={4}
      >
        <Text>Error fetching data</Text>
      </Box>
    );
  }

  if (!dataChart || !dataChart.data.values) {
    return (
      <Box
        flex={flex}
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mt={4}
        mx={4}
      >
        <Text>No data available</Text>
      </Box>
    );
  }

  // Membuat array untuk menyimpan label bulan dan data total income
  const labels = [];
  const totalIncomeData = [];

  // Mendapatkan data dari API dan mengisinya ke dalam array
  for (const [key, value] of Object.entries(dataChart.data.values)) {
    labels.push(key);
    totalIncomeData.push(value[0].total_income);
  }

  return (
    <Box
      flex={flex}
      p={8}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt={4}
      mx={4}
      bg="white"
      color="white"
    >
      <canvas ref={canvasRef}></canvas>
    </Box>
  );
}
