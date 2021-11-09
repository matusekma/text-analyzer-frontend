import * as React from "react";
import { VStack, Text } from "@chakra-ui/react";
import { ProfanityFilterResult } from "../../../client";

interface Props {
  result: ProfanityFilterResult;
}

const ProfanityFilterResultCard = ({ result }: Props) => {
  return (
    <VStack alignItems="start" w="100%" p={2}>
      <Text>
        <b>Filtered text:</b>
      </Text>
      <Text>{result.filteredText}</Text>
    </VStack>
  );
};

export default ProfanityFilterResultCard;
