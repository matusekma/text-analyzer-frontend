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
        <Center mb={8}>
          <Heading as="h1" size="xl">
            Upload text
          </Heading>
        </Center>
        <Stack
          as={"form"}
          spacing={2}
          direction="column"
          align="start"
          mb={4}
          onSubmit={(e) => {
            e.preventDefault();
            // remove this code and implement your submit logic right here
          }}
        >
          <Stack direction={{ base: "column", sm: "row" }}>
            <FormControl id="name" name="name" maxW="300px">
              <FormLabel>Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="description" name="description" maxW="300px">
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
          <Stack w="100%" direction={{ base: "column", sm: "row" }}>
            {uploadMode === TextUploadMode.FILE ? (
              <FormControl id="textFile" name="textFile">
                <FormLabel>Upload</FormLabel>
                <Flex minH="80px" alignItems="center">
                  <Input border="none" pl={1} type="file" />
                </Flex>
              </FormControl>
            ) : (
              <FormControl id="text" name="text" >
                <FormLabel>Text</FormLabel>
                <Textarea
                  value={text}
                  onChange={(e) => {
                    let inputValue = e.target.value;
                    setText(inputValue);
                  }}
                  placeholder="Paste your text here!"
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
            <Button type="submit" colorScheme="teal">
              Submit
            </Button>
            <Button colorScheme="teal">Submit & Analyze</Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default UploadTextPage;
