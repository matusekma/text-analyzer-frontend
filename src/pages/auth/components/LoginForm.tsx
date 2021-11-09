import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

const LoginForm = () => {
  const history = useHistory<{ from: Location } | null>();
  const toast = useToast();
  const { login } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function checkAndSubmit(e: React.FormEvent) {
    e && e.preventDefault();
    if (email && password) {
      try {
        setIsSubmitting(true);
        await login(email, password);
        if (history.location.state && history.location.state.from)
          history.replace(history.location.state.from.pathname, null);
        else {
          history.replace("/", null);
        }
      } catch (err) {
        setIsSubmitting(false);
        if (axios.isAxiosError(err) && err.response?.status === 403) {
          toast({
            title: "Invalid credentials",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Login Error",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    } else {
      setError("Fill in all required fields!");
    }
  }

  return (
    <Stack alignItems="center" as={"form"} onSubmit={checkAndSubmit}>
      <FormControl id="loginEmail" name="email" maxW="300px">
        <FormLabel>E-mail*</FormLabel>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl id="loginPassword" name="password" maxW="300px">
        <FormLabel>Password*</FormLabel>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </FormControl>

      <Center>
        <Text>{error}</Text>
      </Center>

      <Center>
        <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
          Submit
        </Button>
      </Center>
    </Stack>
  );
};

export default LoginForm;
