import { VStack, Text } from "@chakra-ui/react";
import * as React from "react";
import { FailedSingleJobResult } from "../../../client";

interface Props {
  result: FailedSingleJobResult;
}

const FailedSingleJobResultCard = ({ result }: Props) => {
  return (
    <VStack alignItems="start" w="100%" p={2}>
      <Text>
        <b>Job failed:</b>
      </Text>
      <Text>{result.error}</Text>
    </VStack>
  );
};

export default FailedSingleJobResultCard;
