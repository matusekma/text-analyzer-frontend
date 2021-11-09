import { useColorModeValue } from "@chakra-ui/color-mode";
import { Center, Box, Heading } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import * as React from "react";
import { Redirect, useLocation } from "react-router";
import {
  FailedSingleJobResult,
  JobType,
  LanguageDetectionResult,
  PipelineResultResponse,
  ProfanityFilterResult,
  PunctuationRestorationResult,
  SingleJobResult,
  SingleJobResultResponse,
  SingleJobType,
} from "../../client";
import LanguageDetectionResultCard from "./components/LanguageDetectionResultCard";
import ProfanityFilterResultCard from "./components/ProfanityFilterResultCard";
import PunctuationRestorationResultCard from "./components/PunctuationRestorationResultCard";
import FailedSingleJobResultCard from "./components/FailedSingleJobResultCard";
import { Link } from "react-router-dom";

function getResultComponent(result: SingleJobResult) {
  if (result.isFailed)
    return (
      <FailedSingleJobResultCard result={result as FailedSingleJobResult} />
    );
  switch (result.type) {
    case SingleJobType.LanguageDetection:
      return (
        <LanguageDetectionResultCard
          result={result as LanguageDetectionResult}
        />
      );
    case SingleJobType.ProfanityFilter:
      return (
        <ProfanityFilterResultCard result={result as ProfanityFilterResult} />
      );
    case SingleJobType.PunctuationRestoration:
      return (
        <PunctuationRestorationResultCard
          result={result as PunctuationRestorationResult}
        />
      );
  }
}

const JobResultPage = () => {
  const { state } =
    useLocation<{ uploadId: number; result: SingleJobResultResponse }>();
  const bg = useColorModeValue("white", "gray.700");

  return !state || !state.result ? (
    <Redirect to="/my-uploads" />
  ) : (
    <Center>
      <Box
        w={{ base: "100%", md: "75%" }}
        rounded={"lg"}
        bg={bg}
        boxShadow={"lg"}
        p={8}
      >
        <Center mb={8}>
          <Heading as="h1" size="xl">
            Job result for upload{" "}
            <Link to={`/edit-upload/${state.uploadId}`}>
              <i>#{state.uploadId}</i>
            </Link>
          </Heading>
        </Center>
        <Stack
          rounded={"lg"}
          border="1px solid"
          boxShadow={"lg"}
          w="100%"
          p={2}
          mb={2}
        >
          <Center>
            <Heading as="h2" size="md">
              {
                Object.keys(SingleJobType)[
                  Object.values(SingleJobType).indexOf(
                    state.result.result?.type!
                  )
                ]
              }
            </Heading>
          </Center>
          {getResultComponent(state.result.result!)}
        </Stack>
      </Box>
    </Center>
  );
};

export default JobResultPage;
