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
  FormLabel,
  FormControl,
  Select,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { asrCall } from "../../apiCalls/asrApiCalls";
import { Language } from "../../client";
import { useHistory } from "react-router";

const UploadAudioPage = () => {
  const history = useHistory();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [audioFile, setAudioFile] = useState<File | undefined | null>();
  const [language, setLanguage] = useState(Language.En);

  const [result, setResult] = useState("");

  const executeAsr = async () => {
    if (audioFile) {
      try {
        setIsLoading(true);
        const result = await asrCall(audioFile, language);
        setResult(result.text!);
      } catch (err) {
        toast({
          title: "ASR failed!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const navigateToUploadTextPage = () => {
    history.push("/upload-text", { text: result });
  };

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
              executeAsr();
            }}
          >
            <Input
              id="file"
              name="file"
              border="none"
              p={1}
              type="file"
              onChange={(e) =>
                setAudioFile(e.target.files && e.target.files[0])
              }
              required
            />
            <FormControl id="language" name="language">
              <FormLabel>Language:</FormLabel>

              <Select
                onChange={(e) => setLanguage(e.target.value as Language)}
                value={language}
                maxW="200px"
                placeholder="Select language"
              >
                <option value={Language.En}>{Language.En}</option>
                <option value={Language.De}>{Language.De}</option>
              </Select>
            </FormControl>
            <Button isLoading={isLoading} type="submit" colorScheme="teal">
              Get Text
            </Button>
          </Stack>
        )}
        {result ? (
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
              <Button colorScheme="teal" onClick={navigateToUploadTextPage}>
                Upload
              </Button>
              <Button colorScheme="pink" onClick={() => setResult("")}>
                Cancel
              </Button>
            </Stack>
          </VStack>
        ) : isLoading ? (
          <Center>
            <Heading size="md">ASR in progress...</Heading>
          </Center>
        ) : null}
      </Box>
    </Center>
  );
};

export default UploadAudioPage;
