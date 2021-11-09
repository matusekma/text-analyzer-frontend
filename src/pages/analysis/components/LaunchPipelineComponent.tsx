import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Stack, Heading, VStack } from "@chakra-ui/layout";
import { RadioGroup, Radio } from "@chakra-ui/radio";
import {
  HStack,
  FormLabel,
  Input,
  Select,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import React, { useState } from "react";
import { BiRocket } from "react-icons/bi";
import { FiPlay } from "react-icons/fi";
import { useHistory } from "react-router";
import { launchPipelineCall } from "../../../apiCalls/pipelineApiCalls";
import { JobType, Language, SingleJobType } from "../../../client";

interface Props {
  uploadId: number;
}

const LaunchPipelineComponent = ({ uploadId }: Props) => {
  const toast = useToast();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [language, setLanguage] = useState<Language>(Language.En);
  const [pipelineJobs, setPipelineJobs] = useState<JobType[]>([]);

  const isPipelineReady = pipelineJobs.length > 0 && !!language && !!name;
  const launchPipeline = async () => {
    if (isPipelineReady) {
      try {
        setIsLoading(true);
        const result = await launchPipelineCall({
          uploadId: uploadId,
          language,
          name,
          jobs: pipelineJobs,
          options: { SUMMARIZATION: { length: "3" } },
        });
        history.push("/pipeline-results", { uploadId, result });
      } catch (err) {
        toast({
          title: "Running pipeline failed!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Add every data for the pipeline!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Stack rounded={"lg"} border="1px solid" boxShadow={"lg"} w="100%" p={2}>
      <Heading as="h2" size="lg">
        Assemble pipeline:
      </Heading>
      <HStack>
        <FormControl id="name" name="name" maxW="200px">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
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
      </HStack>
      <FormControl id="jobs" name="jobs">
        <FormLabel>Jobs:</FormLabel>

        <CheckboxGroup
          onChange={(values) =>
            setPipelineJobs(values.map((v) => v as JobType))
          }
          value={pipelineJobs}
          colorScheme="green"
          defaultValue={[]}
        >
          <VStack alignItems="start">
            <Checkbox value={JobType.SentimentAnalysis}>
              Sentiment Analysis
            </Checkbox>
            <Checkbox value={JobType.KeywordExtraction}>
              Keyword Extraction
            </Checkbox>
            <Checkbox value={JobType.PosTag}>POS tagging</Checkbox>
            <Checkbox value={JobType.Ner}>NER</Checkbox>
            <Checkbox value={JobType.Summarization}>Summarization</Checkbox>
          </VStack>
        </CheckboxGroup>
      </FormControl>
      <Button
        maxW="200px"
        isLoading={isLoading}
        disabled={!isPipelineReady}
        onClick={launchPipeline}
        colorScheme="teal"
        variant="outline"
        leftIcon={<BiRocket />}
      >
        Launch
      </Button>
    </Stack>
  );
};

export default LaunchPipelineComponent;
