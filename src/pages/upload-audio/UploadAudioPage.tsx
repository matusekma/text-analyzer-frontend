import * as React from "react";
import {
  Box,
  Button,
  Center,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";

const UploadAudioPage = () => {
  const [audioFile, setAudioFile] = useState("");
  const [result, setResult] = useState("");

  return (
    <Center>
      <Box
        w={{ base: "100%", md: "75%" }}
        minH="50vh"
        maxH="70vh"
        rounded={"lg"}
        overflow="hidden"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Center mb={8}>
          <Heading as="h1" size="xl">
            Upload audio for speech-to-text
          </Heading>
        </Center>
        {!result && (
          <Stack
            as={"form"}
            spacing={2}
            direction="column"
            align="start"
            mb={4}
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              // remove this code and implement your submit logic right here
              setResult("TODO submit to ASR");
            }}
          >
            <Input
              id="audioFile"
              name="audioFile"
              border="none"
              p={1}
              type="file"
              required
            />
            <Button type="submit" colorScheme="teal">
              Get Text
            </Button>
          </Stack>
        )}
        {result && (
          <VStack alignItems="star">
            <Text
              p={2}
              border="1px solid"
              borderRadius="5px"
              height="30vh"
              overflowY="auto"
            >
              {result}
            </Text>
            <Stack direction={{ base: "column", sm: "row" }}>
              <Button colorScheme="teal">Upload</Button>
              <Button colorScheme="pink" onClick={() => setResult("")}>
                Cancel
              </Button>
            </Stack>
          </VStack>
        )}
      </Box>
    </Center>
  );
};

export default UploadAudioPage;
