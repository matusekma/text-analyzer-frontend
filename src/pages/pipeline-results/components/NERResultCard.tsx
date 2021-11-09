import { VStack, Text, ListItem, UnorderedList } from "@chakra-ui/react";
import * as React from "react";
import { NERResult } from "../../../client";

interface Props {
  result: NERResult;
}

const NERResultCard = ({ result }: Props) => {
  return (
    <VStack alignItems="start" w="100%" p={2}>
      <UnorderedList>
        {result.results?.map((result, i) => (
          <ListItem marginLeft={6} key={i}>
            <b>{result.text}:</b> {result.label}
          </ListItem>
        ))}
      </UnorderedList>
    </VStack>
  );
};

export default NERResultCard;
