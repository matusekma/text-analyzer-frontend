import {
  VStack,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import * as React from "react";
import { SentimentAnalysisResult } from "../../../client";

interface Props {
  result: SentimentAnalysisResult;
}

const SentimentAnalysisResultCard = ({ result }: Props) => {
  return (
    <VStack alignItems="start" w="100%" p={2}>
      <Table size="xs">
        <Thead>
          <Tr>
            <Th>Sentence</Th>
            <Th>Sentiment</Th>
            <Th>Confidence</Th>
          </Tr>
        </Thead>
        <Tbody>
          {result.results?.map((result, i) => (
            <Tr key={i}>
              <Td>{result.sentence}</Td>
              <Td>{result.sentiment}</Td>
              <Td>{(result.confidence! * 100.0).toFixed(2)}%</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default SentimentAnalysisResultCard;
