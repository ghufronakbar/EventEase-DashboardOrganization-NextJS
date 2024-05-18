import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Loading } from "../Loading";
import { useRef, useState } from "react";
import { baseURL } from "@/lib/baseUrl";
import { InfoOutlineIcon } from "@chakra-ui/icons";

export function TableOrders(status) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const adminNotesRef = useRef();

  const [idHistory, setIdHistory] = useState();
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isOpenProcess, setIsOpenProcess] = useState(false);
  const [isOpenReady, setIsOpenReady] = useState(false);
  const [isOpenDone, setIsOpenDone] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [userNotes, setUserNotes] = useState(false);
  const [adminNotes, setAdminNotes] = useState(false);
  const [itemHistory, setItemHistory] = useState(false);
  let i = 1;
  let subtotal = 0;
  let total = 0;
  

  const { data: dataOrders, refetch: refetchDataMenu } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!status) {
        const dataResponse = await axiosInstance.get(`/orders`);
        setLoading(false);
        return dataResponse;
      } else {
      }
      const dataResponse = await axiosInstance.get(`/orders/${status}`);
      setLoading(false);
      return dataResponse;
    },
  });

  function formatDate(dateTimeString) {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const day = days[dateTime.getDay()];
    const date = dateTime.getDate();
    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();
    return `${hours}:${minutes} ${day}, ${date} ${month} ${year}`;
  }

  const handleCancelByAdmin = async (id_history) => {
    try {
      if (!adminNotesRef.current.value) {
        toast({
          title: "Write notes before cancel the order",
          status: "warning",
          position: "bottom-right",
          isClosable: true,
        });
      } else {
        const formData = {
          admin_notes: adminNotesRef.current.value,
        };

        await axiosInstance.put(`/order/cancel/${id_history}`, formData);
        toast({
          title: "You have cancelled this order",
          status: "info",
          position: "bottom-right",
          isClosable: true,
        });
        refetchDataMenu();
        setIsOpenCancel(false);
        setIsOpenProcess(false);
      }
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleProcess = async (id_history) => {
    try {
      await axiosInstance.put(`/order/process/${id_history}`);
      toast({
        title: "You have process this order",
        status: "info",
        position: "bottom-right",
        isClosable: true,
      });
      refetchDataMenu();
      setIsOpenProcess(false);
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReady = async (id_history) => {
    try {
      await axiosInstance.put(`/order/ready/${id_history}`);
      toast({
        title: "This order is ready to pick/ship",
        status: "info",
        position: "bottom-right",
        isClosable: true,
      });
      refetchDataMenu();
      setIsOpenReady(false);
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleDone = async (id_history) => {
    try {
      await axiosInstance.put(`/order/done/${id_history}`);
      toast({
        title: "This order is completely done",
        status: "info",
        position: "bottom-right",
        isClosable: true,
      });
      refetchDataMenu();
      setIsOpenDone(false);
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Box p={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Customer</Th>
                <Th>Address</Th>
                <Th>Status</Th>
                <Th>
                  <Center>Ordered At</Center>
                </Th>
                <Th>
                  <Center>Finished At</Center>
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            {dataOrders?.data.values.length == 0 ? (
              <TableCaption>
                <Alert status="info">
                  <AlertIcon />
                  There's No{" "}
                  {status == 0
                    ? "Pending"
                    : status == 1
                    ? "Cancel By User"
                    : status == 2
                    ? "Cancel By Admin"
                    : status == 3
                    ? "Paid"
                    : status == 4
                    ? "Process"
                    : status == 5
                    ? "Ready"
                    : status == 6
                    ? "Completed"
                    : ""}{" "}
                  Order
                </Alert>
              </TableCaption>
            ) : (
              ""
            )}
            <Tbody>
              {dataOrders?.data.values.map((item) => (
                <Tr key={item.id_history}>
                  <Td>{i++}</Td>
                  <Td>
                    <Text as="b">{item.fullname}</Text>
                    <Text>{item.email}</Text>
                  </Td>
                  <Td>
                    <Text>{item.address ? item.address : "Take Away"}</Text>
                    <Text>{item.phone}</Text>
                  </Td>
                  <Td>
                    <Center>
                      {item.status === 0 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="grey"
                          color="white"
                          px={4}
                          h={8}
                          onClick={() => {
                            setIsOpenCancel(true);
                            setIdHistory(item.id_history);
                          }}
                        >
                          Pending
                        </Box>
                      )}
                      {item.status === 1 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="orange"
                          color="white"
                          px={4}
                          h={8}
                        >
                          Cancel By User
                        </Box>
                      )}
                      {item.status === 2 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="red"
                          color="white"
                          px={4}
                          h={8}
                        >
                          Cancel By Admin
                        </Box>
                      )}
                      {item.status === 3 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="teal"
                          color="white"
                          px={4}
                          h={8}
                          onClick={() => {
                            setIsOpenProcess(true);
                            setIdHistory(item.id_history);
                          }}
                        >
                          Paid
                        </Box>
                      )}
                      {item.status === 4 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="blue"
                          color="white"
                          px={4}
                          h={8}
                          onClick={() => {
                            setIsOpenReady(true);
                            setIdHistory(item.id_history);
                          }}
                        >
                          On Process
                        </Box>
                      )}
                      {item.status === 5 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="green"
                          color="white"
                          px={4}
                          h={8}
                          onClick={() => {
                            setIsOpenDone(true);
                            setIdHistory(item.id_history);
                          }}
                        >
                          Ready
                        </Box>
                      )}
                      {item.status === 6 && (
                        <Box
                          as="button"
                          borderRadius="md"
                          bg="black"
                          color="white"
                          px={4}
                          h={8}
                        >
                          Done
                        </Box>
                      )}
                    </Center>
                  </Td>
                  <Td isNumeric>
                    <Text>{formatDate(item.ordered_at)}</Text>
                  </Td>
                  <Td isNumeric>
                    <Text>
                      {item.finished_at
                        ? formatDate(item.finished_at)
                        : "Not Yet Finished"}
                    </Text>
                  </Td>
                  <Td>
                    <InfoOutlineIcon
                      onClick={() => {
                        setIsOpenInfo(true);
                        setUserNotes(item.user_notes);
                        setAdminNotes(item.admin_notes);
                        setItemHistory(
                          <>
                            <Table>
                              <Thead>
                                <Th>Product</Th>
                                <Th>Amount</Th>
                                <Th>Price</Th>
                                <Th>Total</Th>
                              </Thead>
                              <Tbody>
                                {item.item_history.map((item_history) => {
                                  // Hitung subtotal
                                  const subtotal =
                                    item_history.amount * item_history.price;
                                  // Tambahkan ke total
                                  total += subtotal;
                                  return (
                                    <Tr key={item_history.id_item_history}>
                                      <Td>{item_history.menu_name}</Td>
                                      <Td>{item_history.amount}</Td>
                                      <Td>{item_history.price}</Td>
                                      <Td>Rp {subtotal}</Td>
                                    </Tr>
                                  );
                                })}
                              </Tbody>
                              <Tr>
                                <Th>Total</Th>
                                <Th>Rp {total}</Th>
                              </Tr>
                              <TableCaption>Include tax and shipping cost</TableCaption>
                            </Table>
                          </>
                        );
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Modal isOpen={isOpenCancel} onClose={() => setIsOpenCancel(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel this order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Why you want to cancel?</FormLabel>
              <Input ref={adminNotesRef} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpenCancel(false)} mr={3}>
              Cancel
            </Button>{" "}
            <Button
              colorScheme="red"
              onClick={() => {
                handleCancelByAdmin(idHistory);
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenProcess} onClose={() => setIsOpenProcess(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel / Process</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Why you want to cancel?</FormLabel>
              <Input ref={adminNotesRef} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                handleCancelByAdmin(idHistory);
              }}
              mr={3}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                handleProcess(idHistory);
              }}
            >
              Process
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenReady} onClose={() => setIsOpenReady(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Is the order ready?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button
              colorScheme="green"
              onClick={() => {
                handleReady(idHistory);
              }}
            >
              Yes!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenDone} onClose={() => setIsOpenDone(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Is the order ready?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                handleDone(idHistory);
              }}
            >
              Finish
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenInfo} onClose={() => setIsOpenInfo(false)} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text as="b">Customer:</Text>
            <Text>{userNotes}</Text>
          </ModalBody>
          <ModalBody>
            <Text as="b">Admin:</Text>
            <Text>{adminNotes}</Text>
          </ModalBody>
          <ModalBody>            
            {itemHistory}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
