import { useColorModeValue } from "@chakra-ui/color-mode";
import { Center, Box, Heading } from "@chakra-ui/layout";
import * as React from "react";

import PipelinesTable from "./components/PipelinesTable";

const PipelinesPage = () => {
  
  return (
    <Center>
      <Box
        w={{ base: "100%", md: "75%" }}
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Center mb={8}>
          <Heading as="h1" size="xl">
            Pipeline history
          </Heading>
        </Center>
        <PipelinesTable />
      </Box>
    </Center>
  );
};

export default PipelinesPage;
