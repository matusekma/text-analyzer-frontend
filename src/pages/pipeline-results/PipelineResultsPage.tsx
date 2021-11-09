import { useColorModeValue } from "@chakra-ui/color-mode";
import { Center, Box, Heading } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import * as React from "react";
import { Redirect, useLocation } from "react-router";
import {
  FailedPipelineJobResult,
  JobResult,
  JobType,
  KeywordExtractionResult,
  NERResult,
  PipelineResultResponse,
  PosTaggingResult,
  SentimentAnalysisResult,
  SummarizationResult,
} from "../../client";
import KeywordExtractionResultCard from "./components/KeywordExtractionResultCard";
import NERResultCard from "./components/NERResultCard";
import PosTaggingResultCard from "./components/PosTaggingResultCard";
import SentimentAnalysisResultCard from "./components/SentimentAnalysisResultCard";
import FailedPipelineJobResultCard from "./components/FailedPipelineJobResultCard";
import { Link } from "react-router-dom";
import SummarizationResultCard from "./components/SummarizationResultCard";

function getResultComponent(result: JobResult) {
  if (result.isFailed)
    return (
      <FailedPipelineJobResultCard result={result as FailedPipelineJobResult} />
    );
  switch (result.type) {
    case JobType.SentimentAnalysis:
      return (
        <SentimentAnalysisResultCard
          result={result as SentimentAnalysisResult}
        />
      );
    case JobType.PosTag:
      return <PosTaggingResultCard result={result as PosTaggingResult} />;
    case JobType.KeywordExtraction:
      return (
        <KeywordExtractionResultCard
          result={result as KeywordExtractionResult}
        />
      );
    case JobType.Ner:
      return <NERResultCard result={result as NERResult} />;
    case JobType.Summarization:
      return <SummarizationResultCard result={result as SummarizationResult} />;
  }
}

const PipelineResultsPage = () => {
  const { state } =
    useLocation<{ uploadId: number; result: PipelineResultResponse }>();
  const bg = useColorModeValue("white", "gray.700");

  return !state ? (
    <Redirect to="/pipeline-history" />
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
            Pipeline results for upload{" "}
            <Link to={`/edit-upload/${state.uploadId}`}>
              <i>#{state.uploadId}</i>
            </Link>
          </Heading>
        </Center>
        {state.result.results?.map((result) => (
          <Stack
            key={result.type}
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
                  Object.keys(JobType)[
                    Object.values(JobType).indexOf(result.type!)
                  ]
                }
              </Heading>
            </Center>
            {getResultComponent(result)}
          </Stack>
        ))}
      </Box>
    </Center>
  );
};

export default PipelineResultsPage;
