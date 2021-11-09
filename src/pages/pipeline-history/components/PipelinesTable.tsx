import React, { useEffect, useState } from "react";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/table";
import { useQueryClient } from "react-query";
import {
  Box,
  Center,
  IconButton,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import usePipelinePage from "../../../apiCalls/hooks/usePipelinePage";
import { CircularProgress } from "@chakra-ui/react";
import useSort from "../../../hooks/useSort";
import usePaging from "../../../hooks/usePaging";
import Paginator from "../../../components/Paginator";
import { useHistory } from "react-router";
import {
  getPipelinePage,
  launchPipelineCall,
} from "../../../apiCalls/pipelineApiCalls";
import { JobType, PipelineResponse } from "../../../client";
import { BiRocket } from "react-icons/bi";

const headers = [
  {
    id: "name",
    name: "Name",
    sortable: true,
  },
  {
    id: "language",
    name: "Language",
    sortable: false,
  },
  {
    id: "uploadId",
    name: "Upload id",
    sortable: true,
  },
  {
    id: "jobs",
    name: "Jobs",
    sortable: false,
  },
  {
    id: "createdAt",
    name: "Launched at",
    sortable: true,
  },
  {
    id: "actions",
    name: "Actions",
    sortable: false,
  },
] as const;

const PipelinesTable = () => {
  const history = useHistory();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [totalPages, setTotalPages] = useState(0);
  const { pagination, handlePageChange, handleRowsPerPageChange } = usePaging();
  const { sort, handleSortChange } = useSort("createdAt");
  const [isPipelineRelaunchLoading, setIsPipelineRelaunchLoading] =
    useState(false);

  const { isLoading, isError, data, refetch } = usePipelinePage(
    pagination.page,
    pagination.rowsPerPage,
    sort.column,
    sort.direction
  );

  const relaunchPipeline = async (pipeline: PipelineResponse) => {
    try {
      setIsPipelineRelaunchLoading(true);
      const result = await launchPipelineCall({
        uploadId: +pipeline.uploadId!,
        language: pipeline.language!,
        name: pipeline.name!,
        jobs: pipeline.jobs!,
      });
      history.push("/pipeline-results", {
        uploadId: +pipeline.uploadId!,
        result,
      });
    } catch (err) {
      toast({
        title: "Running pipeline failed!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsPipelineRelaunchLoading(false);
    }
  };

  React.useEffect(() => {
    if (data && !data.last) {
      queryClient.prefetchQuery(
        [
          "pipeline-page",
          pagination.page + 1,
          pagination.rowsPerPage,
          sort.column,
          sort.direction,
        ],
        () =>
          getPipelinePage(
            pagination.page + 1,
            pagination.rowsPerPage,
            sort.column,
            sort.direction
          )
      );
    }
  }, [
    queryClient,
    data,
    pagination.page,
    pagination.rowsPerPage,
    sort.column,
    sort.direction,
  ]);

  useEffect(() => {
    if (data && data.totalPages) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  return data && data.content && data.content.length > 0 ? (
    <Box overflowX="auto">
      <Table size="sm" variant="striped" colorScheme="teal" mb={2}>
        <Thead>
          <Tr>
            <Th>#</Th>
            {headers.map((header) => (
              <Th
                key={header.id}
                cursor={header.sortable ? "pointer" : "default"}
                onClick={
                  header.sortable ? () => handleSortChange(header.id) : () => {}
                }
              >
                {header.name}{" "}
                {sort.column === header.id &&
                  (sort.direction === "asc" ? (
                    <ChevronUpIcon boxSize="1.5em" />
                  ) : (
                    <ChevronDownIcon boxSize="1.5em" />
                  ))}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.content.map((pipeline, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{pipeline.name}</Td>
              <Td>{pipeline.language}</Td>
              <Td>{pipeline.uploadId || "Upload deleted"}</Td>
              <Td>
                <UnorderedList>
                  {pipeline.jobs?.map((j, i) => (
                    <ListItem key={i}>
                      {Object.keys(JobType)[Object.values(JobType).indexOf(j)]}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Td>
              <Td>{new Date(pipeline.createdAt!).toLocaleString()}</Td>

              <Td>
                <Tooltip label="Launch again" fontSize="md">
                  <IconButton
                    isLoading={isPipelineRelaunchLoading}
                    isDisabled={!pipeline.uploadId}
                    onClick={() => relaunchPipeline(pipeline)}
                    variant="ghost"
                    aria-label="Launch again"
                    icon={<BiRocket />}
                  />
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Paginator
        isLoading={isLoading}
        page={pagination.page}
        totalPages={totalPages}
        rowsPerPage={pagination.rowsPerPage}
        handleChangeRowsPerPage={handleRowsPerPageChange}
        handlePageChange={handlePageChange}
      />
    </Box>
  ) : (
    <Center>
      {isLoading ? (
        <CircularProgress isIndeterminate />
      ) : isError ? (
        <Text>Error loading pipelines!</Text>
      ) : (
        <Text>No pipelines available</Text>
      )}
    </Center>
  );
};
export default PipelinesTable;
