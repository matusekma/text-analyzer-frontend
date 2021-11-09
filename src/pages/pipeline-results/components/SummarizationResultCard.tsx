import { VStack, Text, ListItem, UnorderedList } from "@chakra-ui/react";
import * as React from "react";
import { SummarizationResult } from "../../../client";

interface Props {
  result: SummarizationResult;
}

const SummarizationResultCard = ({ result }: Props) => {
  return (
    <VStack alignItems="start" w="100%" p={2}>
      <Text>
        <b>Summary sentences:</b>
      </Text>

      <UnorderedList>
        {result.results?.map((sentence, i) => (
          <ListItem marginLeft={6} key={i}>{sentence}</ListItem>
        ))}
      </UnorderedList>
    </VStack>
  );
};

export default SummarizationResultCard;
