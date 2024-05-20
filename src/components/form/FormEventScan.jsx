import {
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  Spacer,
  Flex,
  FormLabel,
  Stack,
  VStack,
  Textarea,
  useToast,
  AlertIcon,
  Alert,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Loading } from "../Loading";
import axiosInstanceAuthorization from "@/lib/axiosInstanceAuthorization";
import { primaryColor, secondaryColor, tersierColor, white } from "@/lib/color";

export function FormEventScan() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [ucIdHistory, setUcIdHistory] = useState("");
  const [ucIdUser, setUcIdUser] = useState("");
  const [ucIdOrganization, setUcIdOrganization] = useState("");
  const [ucIdEvent, setUcIdEvent] = useState("");
  const [ucIdTicket, setUcIdTicket] = useState("");
  const [ucAmount, setUcAmount] = useState("");
  const [ucDate, setUcDate] = useState("");
  const unique_code = `${ucIdHistory}/${ucIdUser}/${ucIdOrganization}/${ucIdEvent}/${ucIdTicket}/${ucAmount}/${ucDate}`;

  const handleScanTicket = async () => {
    try {
      if (
        !(
          ucIdHistory &&
          ucIdUser &&
          ucIdOrganization &&
          ucIdEvent &&
          ucIdTicket &&
          ucAmount &&
          ucDate
        )
      ) {
        toast({
          title: "Complete form to scan ticket",
          status: "warning",
          position: "bottom-right",
          isClosable: true,
        });
        return;
      }
      await axiosInstanceAuthorization.put(`/order/scan-ticket`, {
        unique_code,
      });
      toast({
        title: "Success scanning ticket",
        status: "success",
        position: "bottom-right",
        isClosable: true,
      });
    } catch (error) {
      let errorMessage = "Error scanning ticket";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      toast({
        title: errorMessage,
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <form>
        <Box p={8} borderWidth="1px" borderRadius="lg" overflow="hidden" mt={4}>
          <Flex mt={4}>
            <Box
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              flex={18}
            >
              <Heading my={4}>Scan Ticket</Heading>
              <Stack spacing={4}>
                <FormControl>
                  <Flex>
                    <Box flex="1" mr={2}>
                      <Input
                        name="ucIdHistory"
                        value={ucIdHistory}
                        onChange={(e) => setUcIdHistory(e.target.value)}
                        type="number"
                      />
                    </Box>
                    <Box flex="1" mr={2}>
                      <Input
                        name="ucIdUser"
                        value={ucIdUser}
                        onChange={(e) => setUcIdUser(e.target.value)}
                        type="number"
                      />
                    </Box>
                    <Box flex="1" mr={2}>
                      <Input
                        name="ucIdOrganization"
                        value={ucIdOrganization}
                        onChange={(e) => setUcIdOrganization(e.target.value)}
                        type="number"
                      />
                    </Box>
                    <Box flex="1" mr={2}>
                      <Input
                        name="ucIdEvent"
                        value={ucIdEvent}
                        onChange={(e) => setUcIdEvent(e.target.value)}
                        type="number"
                      />
                    </Box>
                    <Box flex="1" mr={2}>
                      <Input
                        name="ucIdTicket"
                        value={ucIdTicket}
                        onChange={(e) => setUcIdTicket(e.target.value)}
                        type="number"
                      />
                    </Box>
                    <Box flex="1" mr={2}>
                      <Input
                        name="ucAmount"
                        value={ucAmount}
                        onChange={(e) => setUcAmount(e.target.value)}
                        type="number"
                      />
                    </Box>
                    <Box flex="2" mr={2}>
                      <Input
                        name="ucDate"
                        value={ucDate}
                        type="date"
                        onChange={(e) => setUcDate(e.target.value)}
                      />
                    </Box>
                  </Flex>
                </FormControl>
              </Stack>
            </Box>
          </Flex>
          <VStack mt={4}>
            <Button
              bg={primaryColor}
              color={white}
              onClick={() => {
                handleScanTicket();
              }}
            >
              Scan Ticket
            </Button>
          </VStack>
        </Box>
      </form>
    </>
  );
}
