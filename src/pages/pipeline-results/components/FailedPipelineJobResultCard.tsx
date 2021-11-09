import { VStack, Text } from "@chakra-ui/react";
import * as React from "react";
import { FailedPipelineJobResult } from "../../../client";

interface Props {
  result: FailedPipelineJobResult;
}

const FailedPipelineJobResultCard = ({ result }: Props) => {
  return (
    <VStack alignItems="start" w="100%" p={2}>
      <Text>
        <b>Pipeline job failed:</b>
      </Text>
      <Text>{result.type}</Text>
      <Text>{result.error}</Text>
    </VStack>
  );
};

export default FailedPipelineJobResultCard;
