import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Image,
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
import axiosInstanceAuthorization from "../../lib/axiosInstanceAuthorization";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Loading } from "../Loading";
import { primaryColor, secondaryColor, tersierColor } from "@/lib/color";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useSearchParams } from "next/navigation";

export function TableEvent() {
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const queryTime = searchParams.get("time");
  const queryStatus = searchParams.get("status");

  const { data: dataEvent, isLoading, isError } = useQuery({
    queryKey: ["events", queryTime, queryStatus],
    queryFn: async () => {
      const endpoint = (queryTime=='' && queryStatus=='')
        ? "/events"
        : `/events?time=${queryTime}&status=${queryStatus}`;
      const dataResponse = await axiosInstanceAuthorization.get(endpoint);
      return dataResponse.data;
    },
  });

  const noData = () => {
    if (dataEvent && dataEvent.length === 0) {
      return (
        <Alert status="warning">
          <AlertIcon />
          There's no data event
        </Alert>
      );
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <Text>Error loading data</Text>;

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
          {dataEvent && dataEvent.map((event, index) => (
            <Tr key={event.id_event}>
              <Td>{index + 1}</Td>
              <Td>
                <Image
                  src={event.event_image}
                  alt={event.event_name}
                  boxSize="50px"
                  borderRadius="50%"
                  objectFit="cover"
                />
              </Td>
              <Td>{event.event_name}</Td>
              <Td>
                {event.location}
                <a href={event.url_google_map} target="_blank">
                  {" "}
                  <ExternalLinkIcon />
                </a>
              </Td>
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
                {event.status == 0 ? (
                  <Button
                    onClick={() =>
                      router.push(`/admin/event/${event.id_event}`)
                    }
                  >
                    Edit
                  </Button>
                ) : event.status == 1 ? (
                  <Button
                    bg="red"
                    color="white"
                    onClick={() => handleDelete(event.id_event)}
                  >
                    Delete
                  </Button>
                ) : event.status == 2 ? (
                  <Button
                    onClick={() =>
                      router.push(`/admin/event/${event.id_event}`)
                    }
                  >
                    Edit
                  </Button>
                ) : (
                  ""
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {noData()}
    </TableContainer>
  );
}
