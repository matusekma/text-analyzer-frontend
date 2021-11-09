import * as React from "react";
import { useEffect } from "react";
import {
  Box,
  Center,
  Stack,
  useColorModeValue,
  Heading,
  CircularProgress,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { getUploadCall } from "../../apiCalls/uploadApiCalls";
import { useParams } from "react-router";
import { UploadDetailsResponse } from "../../client";
import RunJobComponent from "./components/RunJobComponent";
import LaunchPipelineComponent from "./components/LaunchPipelineComponent";

const AnalysisPage = () => {
  const { uploadId } = useParams<{ uploadId: string }>();

  const [upload, setUpload] = useState<UploadDetailsResponse>();

  useEffect(() => {
    async function fetchUpload() {
      const upload = await getUploadCall(+uploadId);
      setUpload(upload);
    }

    fetchUpload();
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
        {upload ? (
          <>
            <Center mb={8}>
              <Heading as="h1" size="xl">
                Analyze upload <i>"{upload.name}"</i>
              </Heading>
            </Center>

            <Stack spacing={2} direction="column" align="start" mb={4}>
              <VStack alignItems="start" rounded={"lg"} border="1px solid" boxShadow={"lg"} w="100%" p={2}>
                <Text>
                  <b>Name:</b> {upload.name}
                </Text>
                <Text>
                  <b>Description:</b> {upload.description}
                </Text>
              </VStack>

              <RunJobComponent uploadId={+uploadId}/>

              <LaunchPipelineComponent uploadId={+uploadId} />
            </Stack>
          </>
        ) : (
          <Center>
            <CircularProgress isIndeterminate />
          </Center>
        )}
      </Box>
    </Center>
  );
};

export default AnalysisPage;
