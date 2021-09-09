import * as React from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Textarea,
  Radio,
  RadioGroup,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import MultiSelect from "../../components/inputs/MultiSelect";

enum TextUploadMode {
  FILE,
  PLAIN,
}

const UploadTextPage = () => {
  const [text, setText] = useState("");
  const [uploadMode, setUploadMode] = useState<TextUploadMode>(
    TextUploadMode.PLAIN
  );

  return (
    <Center>
      <Box
        w={{ base: "100%", md: "75%" }}
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Center mb={6}>
          <Heading as="h1" size="xl">
            Upload text
          </Heading>
        </Center>
        <Stack spacing={4}>
          <Stack direction={{ base: "column", sm: "row" }}>
            <FormControl id="name" maxW="300px">
              <FormLabel>Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="description" maxW="300px">
              <FormLabel>Short description</FormLabel>
              <Input type="text" />
            </FormControl>
          </Stack>
          <RadioGroup
            onChange={(s) => setUploadMode(TextUploadMode[s])}
            value={TextUploadMode[uploadMode]}
          >
            <Stack direction="row">
              <Radio value="PLAIN">Plain text</Radio>
              <Radio value="FILE">File</Radio>
            </Stack>
          </RadioGroup>
          <Stack direction={{ base: "column", sm: "row" }}>
            {uploadMode === TextUploadMode.FILE ? (
              <FormControl id="textFile">
                <FormLabel>Upload</FormLabel>
                <Flex minH="80px" alignItems="center">
                  <Input border="none" pl={1} type="file" />
                </Flex>
              </FormControl>
            ) : (
              <FormControl id="text">
                <FormLabel>Text</FormLabel>
                <Textarea
                  value={text}
                  onChange={(e) => {
                    let inputValue = e.target.value;
                    setText(inputValue);
                  }}
                  placeholder="Paste your text here!"
                  size="sm"
                />
              </FormControl>
            )}
          </Stack>
          <Stack direction={{ base: "column", sm: "row" }}>
            <FormControl id="labels">
              <FormLabel>Labels</FormLabel>

              <MultiSelect
                options={["label1", "label2", "label3"]}
                name="labels"
              />
            </FormControl>
          </Stack>
          <Stack direction={{ base: "column", sm: "row" }}>
            <Button colorScheme="teal">Submit</Button>
            <Button colorScheme="teal">Submit & Analyze</Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default UploadTextPage;
