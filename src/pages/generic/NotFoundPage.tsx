import * as React from "react";
import {
  Button,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const NotFoundPage = () => {
  return (
    <VStack justifyContent="center" spacing={4}>
      <Image size="sm" src={logo} alt="Text Analyzer" />
      <Heading>404 | Page Not Found</Heading>
      <Text>You just hit a route that doesn&#x27;t exist...😢</Text>
      <Link to="/">
        <Button leftIcon={<FaHome />} colorScheme="teal">
          Back to Home
        </Button>
      </Link>
    </VStack>
  );
};

export default NotFoundPage;
