import { useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { HeadAdmin } from "@/components/HeadAdmin";
import { useRouter } from "next/router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      const { success, message, token, status } = response.data;

      if (success) {
        localStorage.setItem("token", token);
        // Redirect to dashboard or other page
        toast({
          title: "Login Successfully",
          status: "success",
          position: "bottom-right",
          isClosable: true,
        });

        router.push(`/admin/dashboard`);
      } else {
        console.log(response);
        setError(message);
        toast({
          title: "Email or Password doesn't match",
          status: "error",
          position: "bottom-right",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <>
      <HeadAdmin />
      <main>
        <Container>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Heading>Login Admin</Heading>
          <form onSubmit={handleLogin}>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <Button mt={6} type="submit">
              Login
            </Button>
          </form>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </Container>
      </main>
    </>
  );
}

export default Login;
