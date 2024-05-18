import { Box, Text, Stack, Tr, Table, Th, Td } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { LoadingComponent } from "../LoadingComponent";

export default function StatisticDone({ flex }) {
  const {
    data: dataMenu,
    isLoading,
    error,
    refetch: refetchDataMenu,
  } = useQuery({
    queryKey: ["order/total/done"],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/order/total/done");
      return dataResponse;
    },
  });

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

  return (
    <Box
      flex={flex}
      p={8}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt={4}
      mx={4}
      bg='teal'
      color='white'
    >
      {dataMenu?.data.values.map((item) => (
        <div key={item.total_order}>
          <Text fontSize="3xl" as="b" ml={4}>
            All Orders
          </Text>
          <Stack mt={6}>
            <Text fontSize="5xl" as="b" ml={4}>
              {item.total_order} Orders
            </Text>
          </Stack>
        </div>
      ))}
    </Box>
  );
}
