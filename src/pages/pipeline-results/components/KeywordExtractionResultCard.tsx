import { VStack, Text, ListItem, UnorderedList, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import * as React from "react";
import { KeywordExtractionResult } from "../../../client";

interface Props {
  result: KeywordExtractionResult;
}

const KeywordExtractionResultCard = ({ result }: Props) => {
  return (
    <VStack alignItems="start" w="100%" p={2}>

      <Table size="xs">
        <Thead>
          <Tr>
            <Th>Keyword</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {result.results?.sort((a,b)=> a.score - b.score).map((result, i) => (
            <Tr key={i}>
              <Td>{result.keyword}</Td>
              <Td>{result.score}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default KeywordExtractionResultCard;
