import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  VStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import logo from "../../assets/logo.png";

const LoginOrRegisterPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <VStack h="100vh" bg={useColorModeValue("blue.100", "gray.700")}>
      <Box>
        <Image src={logo} alt="Text Analyzer" />
      </Box>
      <Box
        w={{ base: "90%", md: "65%" }}
        minH="50vh"
        maxH="70vh"
        rounded={"lg"}
        overflow="hidden"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        mt={8}
        p={8}
      >
        <Tabs isFitted index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <RegisterForm navigateToLogin={() => setTabIndex(0)} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </VStack>
  );
};

export default LoginOrRegisterPage;
