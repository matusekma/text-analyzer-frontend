import * as React from "react";
import { VStack, Text } from "@chakra-ui/react";
import { PunctuationRestorationResult } from "../../../client";

interface Props {
  result: PunctuationRestorationResult;
}

const PunctuationRestorationResultCard = ({ result }: Props) => {
  return (
    <VStack alignItems="start" w="100%" p={2}>
      <Text>
        <b>Restored text:</b>
      </Text>
      <Text>{result.restoredText}</Text>
    </VStack>
  );
};

export default PunctuationRestorationResultCard;
