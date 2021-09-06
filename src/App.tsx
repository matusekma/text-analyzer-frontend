import * as React from "react";
import {
  ChakraProvider,
  Box,
  Link,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import SidebarWithHeader from "./components/menu/SidebarWithHeader";

export const App = () => (
  <ChakraProvider theme={theme}>
    <SidebarWithHeader
      children={
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <VStack spacing={8}>
              <Logo h="40vmin" pointerEvents="none" />

              <Link
                color="teal.500"
                href="https://chakra-ui.com"
                fontSize="2xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn Chakra
              </Link>
            </VStack>
          </Grid>
        </Box>
      }
    />
  </ChakraProvider>
);
