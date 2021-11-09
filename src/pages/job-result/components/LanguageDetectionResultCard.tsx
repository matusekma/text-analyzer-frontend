import { VStack, Text } from "@chakra-ui/react";
import * as React from "react";
import { LanguageDetectionResult } from "../../../client";

interface Props {
  result: LanguageDetectionResult;
}

const LanguageDetectionResultCard = ({ result }: Props) => {
  return (
    <VStack alignItems="start" w="100%" p={2}>
      {result.languages && result.languages.length > 0 ? (
        result.languages.map((l, i) => (
          <Text key={i}>
            <b>{l}:</b>{" "}
            {result?.confidences && (result.confidences[i] * 100.0).toFixed(2)}%
          </Text>
        ))
      ) : (
        <Text>No result.</Text>
      )}
    </VStack>
  );
};

export default LanguageDetectionResultCard;
