import * as React from "react";
import { useEffect } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import MultiSelect from "../../components/inputs/MultiSelect";
import { uploadTextCall } from "../../apiCalls/uploadApiCalls";
import { getLabelsCall, createLabelCall } from "../../apiCalls/labelApiCalls";
import { useHistory } from "react-router";
import { LabelResponse } from "../../client";
import { Option } from "../../components/inputs/MultiSelect";
import axios from "axios";
import { useLocation } from "react-router-dom";

enum TextUploadMode {
  FILE,
  PLAIN,
}

const UploadTextPage = () => {
  const history = useHistory();
  const toast = useToast();
  const { state } = useLocation<{ text: string }>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState((state && state.text) || "");
  const [selectedLabels, setSelectedLabels] = useState<Option[]>([]);
  const [labels, setLabels] = useState<LabelResponse[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [uploadMode, setUploadMode] = useState<TextUploadMode>(
    TextUploadMode.PLAIN
  );

  const getText = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    changeEvent.preventDefault();
    if (
      changeEvent.target &&
      changeEvent.target.files &&
      changeEvent.target.files.length > 0
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e && e.target) {
          setText(e.target.result as string);
          setUploadMode(TextUploadMode.PLAIN);
        }
      };

      reader.readAsText(changeEvent.target.files[0]);
    }
  };

  const upload = async (withAnalysis = false) => {
    if (name && text && description) {
      try {
        const uploadTextResponse = await uploadTextCall({
          name,
          description,
          text,
          labelIds: selectedLabels.map((l) => l.value),
        });
        if (withAnalysis) {
          history.push(`/analysis/${uploadTextResponse.id!!}`);
        } else {
          history.push("/my-uploads");
        }
      } catch (err) {
        toast({
          title: "Error uploading text",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "All text fields must be filled!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const createLabel = async () => {
    if (newLabel) {
      try {
        await createLabelCall({
          name: newLabel,
        });
        await fetchLabels();
        setNewLabel("");
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 409) {
          toast({
            title: "Label already exists",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error creating label!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    } else {
      toast({
        title: "Label must have a name!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  async function fetchLabels() {
    const labels = await getLabelsCall();
    setLabels(labels);
  }

  useEffect(() => {
    fetchLabels();
  }, []);

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
          mb={4}
          onSubmit={(e) => {
            e.preventDefault();
            upload();
          }}
        >
          <Stack direction={{ base: "column", sm: "row" }}>
            <FormControl id="name" name="name" maxW="300px">
              <FormLabel>Name</FormLabel>
              <Input type="text" onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="description" name="description" maxW="300px">
              <FormLabel>Short description</FormLabel>
              <Input
                value={description}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </Stack>
          <RadioGroup
            onChange={(s) => {
              setUploadMode(TextUploadMode[s as keyof typeof TextUploadMode]);
              setText("");
            }}
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
                  <Input
                    border="none"
                    pl={1}
                    type="file"
                    accept=".txt, text/plain"
                    onChange={(e) => getText(e)}
                  />
                </Flex>
              </FormControl>
            ) : (
              <FormControl id="text" name="text">
                <FormLabel>Text</FormLabel>
                <Textarea
                  h="30vh"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text here!"
                />
              </FormControl>
            )}
          </Stack>
          <Stack direction={{ base: "column", sm: "row" }}>
            <FormControl id="labels">
              <FormLabel>Labels</FormLabel>

              <MultiSelect
                options={labels.map((l) => ({ label: l.name!, value: l.id! }))}
                value={selectedLabels}
                onChange={(options: Option[]) => setSelectedLabels(options)}
                name="labels"
              />
            </FormControl>
            <FormControl id="description" name="description" maxW="300px">
              <FormLabel>New label</FormLabel>
              <Input
                value={newLabel}
                type="text"
                onChange={(e) => setNewLabel(e.target.value)}
              />
            </FormControl>
            <Button
              onClick={createLabel}
              alignSelf={{ base: "flex-start", sm: "flex-end" }}
              colorScheme="teal"
            >
              Create
            </Button>
          </Stack>
          <Stack direction={{ base: "column", sm: "row" }}>
            <Button type="submit" colorScheme="teal">
              Submit
            </Button>
            <Button onClick={() => upload(true)} colorScheme="teal">
              Submit {"&"} Analyze
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default UploadTextPage;
