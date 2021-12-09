import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import NERResultCard from "./NERResultCard";
import { NERResult } from "../../../client";

test("renders NERResultCard with the correct result data", async () => {
  const mockResult: NERResult = {
    results: [
      { text: "Adam", label: "PERSON" },
      { text: "Budapest", label: "LOC" },
    ],
  };
  const { container } = render(<NERResultCard result={mockResult} />);
  container.querySelectorAll("ul li").forEach((e,i) => {
    const content = e.textContent?.split(": ");
    expect(content).toBeDefined();
    expect(content![0]).toBe(mockResult.results![i].text);
    expect(content![1]).toBe(mockResult.results![i].label);
  });
});
