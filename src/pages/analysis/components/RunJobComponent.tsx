import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Stack, Heading, VStack } from "@chakra-ui/layout";
import { RadioGroup, Radio } from "@chakra-ui/radio";
import { useToast } from "@chakra-ui/toast";
import React, { useState } from "react";
import { FiPlay } from "react-icons/fi";
import { useHistory } from "react-router";
import { runJobCall } from "../../../apiCalls/pipelineApiCalls";
import { Language, SingleJobType } from "../../../client";

interface Props {
  uploadId: number;
}

const RunJobComponent = ({ uploadId }: Props) => {
  const toast = useToast();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.En);
  const [singleJob, setSingleJob] = useState<SingleJobType>(
    SingleJobType.LanguageDetection
  );

  const runJob = async () => {
    if (singleJob) {
      try {
        setIsLoading(true);
        const singleJobResult = await runJobCall({
          uploadId,
          job: singleJob,
          language,
        });
        history.push("/job-result", { uploadId, result: singleJobResult });
      } catch (err) {
        toast({
          title: "Running job failed!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Choose job",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Stack rounded={"lg"} border="1px solid" boxShadow={"lg"} w="100%" p={2}>
      <Heading as="h2" size="lg">
        Choose single task
      </Heading>
      <FormControl id="singleTask" name="singleTask">
        <RadioGroup
          onChange={(s) => setSingleJob(s as SingleJobType)}
          value={singleJob}
        >
          <VStack alignItems="start">
            <Radio value={SingleJobType.LanguageDetection}>
              Detect Language
            </Radio>
            <Radio value={SingleJobType.ProfanityFilter}>
              Profanity Filter (English only)
            </Radio>
            <Radio value={SingleJobType.PunctuationRestoration}>
              Punctuation Restoration (English only)
            </Radio>
          </VStack>
        </RadioGroup>
      </FormControl>
      {/* TODO - implement profanity filter and punctuation restoration in german
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
        </FormControl>*/}
      <Button
        isLoading={isLoading}
        maxW="200px"
        colorScheme="teal"
        variant="outline"
        leftIcon={<FiPlay />}
        onClick={runJob}
      >
        Run
      </Button>
    </Stack>
  );
};

export default RunJobComponent;
