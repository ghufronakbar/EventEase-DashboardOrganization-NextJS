import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axiosInstanceAuthorization from "../../lib/axiosInstanceAuthorization"; // Pastikan Anda mengimpor api dari api.js
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Loading } from "../Loading";
import { useState } from "react";
import { primaryColor, secondaryColor, tersierColor } from "@/lib/color";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export function TableEvent() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  const { data: dataEvent, refetch: refetchDataEvent } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const dataResponse = await axiosInstanceAuthorization.get("/events");
      setLoading(false);
      return dataResponse.data; // Jangan lupa untuk mengambil data dari respons
    },
  });

  if (loading) return <Loading />;

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th></Th>
            <Th>Event Name</Th>
            <Th>Location</Th>

            <Th>
              <Center>Event Type</Center>
            </Th>
            <Th>
              <Center>Status</Center>
            </Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataEvent.map((event, index) => (
            <Tr key={event.id_event}>
              <Td>{index + 1}</Td>
              <Td>
                <Image
                  src={event.event_image}
                  alt={event.event_name}
                  boxSize="50px"
                />
              </Td>
              <Td>{event.event_name}</Td>
              <Td>{event.location}<a href={event.url_google_map}target="_blank">  <ExternalLinkIcon /></a></Td>
              <Td>
                <Center>
                  <Box
                    as="button"
                    borderRadius="md"
                    bg={primaryColor}
                    color="white"
                    px={4}
                    h={8}
                  >
                    <Text>{event.event_type}</Text>
                  </Box>
                </Center>
              </Td>
              <Td>
                <Center>
                  {event.status == 0 ? (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg={tersierColor}
                      color="white"
                      px={4}
                      h={8}
                    >
                      <Text>Pending</Text>
                    </Box>
                  ) : event.status == 1 ? (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg={secondaryColor}
                      color="white"
                      px={4}
                      h={8}
                    >
                      <Text>Rejected</Text>
                    </Box>
                  ) : event.status == 2 ? (
                    <Box
                      as="button"
                      borderRadius="md"
                      bg={primaryColor}
                      color="white"
                      px={4}
                      h={8}
                    >
                      <Text>Approved</Text>
                    </Box>
                  ) : (
                    ""
                  )}
                </Center>
              </Td>
              <Td>
                <Button
                  onClick={() =>
                    router.push(`/admin/event/${event.id_event}`)
                  }
                >
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
