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
  Heading,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import { useState } from "react";
import MultiSelect from "../../components/inputs/MultiSelect";
import { getUploadCall, editUploadCall } from "../../apiCalls/uploadApiCalls";
import { getLabelsCall } from "../../apiCalls/labelApiCalls";
import { useHistory, useParams } from "react-router";
import { LabelResponse, UploadDetailsResponse } from "../../client";
import { Option } from "../../components/inputs/MultiSelect";

const EditUploadPage = () => {
  const history = useHistory();
  const toast = useToast();
  const { uploadId } = useParams<{ uploadId: string }>();

  const [upload, setUpload] = useState<UploadDetailsResponse>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<Option[]>([]);
  const [labels, setLabels] = useState<LabelResponse[]>([]);

  const uploadEdit = async () => {
    if (name && text && description) {
      try {
        await editUploadCall(+uploadId, {
          name,
          description,
          text,
          labelIds: selectedLabels.map((l) => l.value),
        });
        history.push("/my-uploads");
      } catch (err) {
        toast({
          title: "Editing upload failed!",
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

  useEffect(() => {
    async function fetchLabels(upload: UploadDetailsResponse) {
      const labels = await getLabelsCall();
      setLabels(labels);
      const selected = labels
        .filter((l) => upload.labelIds?.includes(l.id!))
        .map((l) => ({ label: l.name!, value: l.id! }));
      setSelectedLabels(selected);
    }

    async function fetchUploadAndLabels() {
      const upload = await getUploadCall(+uploadId);
      setUpload(upload);
      setName(upload?.name || "");
      setDescription(upload?.description || "");
      setText(upload?.text || "");
      await fetchLabels(upload);
    }

    fetchUploadAndLabels();
  }, [uploadId]);

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
        {upload ? (
          <Stack
            as={"form"}
            spacing={2}
            direction="column"
            align="start"
            mb={4}
            onSubmit={(e) => {
              e.preventDefault();
              uploadEdit();
            }}
          >
            <Stack direction={{ base: "column", sm: "row" }}>
              <FormControl id="name" name="name" maxW="300px">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id="description" name="description" maxW="300px">
                <FormLabel>Short description</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
            </Stack>
            <Stack w="100%" direction={{ base: "column", sm: "row" }}>
              <FormControl id="text" name="text">
                <FormLabel>Text</FormLabel>
                <Textarea
                  h="30vh"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text here!"
                />
              </FormControl>
            </Stack>
            <Stack direction={{ base: "column", sm: "row" }}>
              <FormControl id="labels">
                <FormLabel>Labels</FormLabel>

                <MultiSelect
                  options={labels.map((l) => ({
                    label: l.name!,
                    value: l.id!,
                  }))}
                  value={selectedLabels}
                  onChange={(options: Option[]) => setSelectedLabels(options)}
                  name="labels"
                />
              </FormControl>
            </Stack>
            <Stack direction={{ base: "column", sm: "row" }}>
              <Button type="submit" colorScheme="teal">
                Submit
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Center>
            <CircularProgress isIndeterminate />
          </Center>
        )}
      </Box>
    </Center>
  );
};

export default EditUploadPage;
