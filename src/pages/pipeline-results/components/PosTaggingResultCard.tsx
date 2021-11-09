import * as React from "react";
import {
  VStack,
  Text,
  ListItem,
  UnorderedList,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { PosTaggingResult } from "../../../client";

interface Props {
  result: PosTaggingResult;
}

const PosTaggingResultCard = ({ result }: Props) => {
  return (
    <VStack alignItems="start" w="100%" p={2}>
      <Table size="xs">
        <Thead>
          <Tr>
            <Th>Token</Th>
            <Th>Lemma</Th>
            <Th>POS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {result.results?.map((result, i) => (
            <Tr key={i}>
              <Td>{result.text}</Td>
              <Td>{result.lemma}</Td>
              <Td>{result.tag}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default PosTaggingResultCard;
