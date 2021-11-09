import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Center,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { registerCall } from "../../../apiCalls/authApiCalls";

interface Props {
  navigateToLogin: () => void;
}

const RegisterForm = ({ navigateToLogin }: Props) => {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  function clearInputs() {
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordRepeat("");
  }
  async function checkAndSubmit(e: React.FormEvent) {
    e && e.preventDefault();
    if (username && email && password) {
      if (password === passwordRepeat) {
        try {
          setIsSubmitting(true);
          await registerCall({ email, username, password });
          clearInputs();
          setIsSubmitting(false);
          navigateToLogin();
        } catch (err) {
          setIsSubmitting(false);
          if (axios.isAxiosError(err) && err.response?.status === 409) {
            toast({
              title: "User already exists",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Registration Error",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        }
      } else {
        setError("The two passwords should be the same!");
      }
    } else {
      setError("Fill in all required fields!");
    }
  }

  return (
    <Stack alignItems="center" as={"form"} onSubmit={(e) => checkAndSubmit(e)}>
      <FormControl id="username" name="username" maxW="300px">
        <FormLabel>Username*</FormLabel>
        <Input
          type="text"
          aria-describedby="Username"
          value={username}
          onChange={(e) => {
            setError("");
            setUsername(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="email" name="email" maxW="300px">
        <FormLabel>E-mail*</FormLabel>
        <Input
          type="registrationEmail"
          aria-describedby="Email"
          value={email}
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="registrationPassword" name="registrationPassword" maxW="300px">
        <FormLabel>Password*</FormLabel>
        <Input
          type="password"
          aria-describedby="Password"
          value={password}
          onChange={(e) => {
            setError("");
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="passwordRepeat" name="passwordRepeat" maxW="300px">
        <FormLabel>Repeat Password*</FormLabel>
        <Input
          type="password"
          aria-describedby="Password"
          value={passwordRepeat}
          onChange={(e) => {
            setError("");
            setPasswordRepeat(e.target.value);
          }}
        />
      </FormControl>

      <Center className="mb-4 text-center">
        <Text>{error}</Text>
      </Center>

      <Center>
        <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
          Register
        </Button>
      </Center>
    </Stack>
  );
};

export default RegisterForm;
