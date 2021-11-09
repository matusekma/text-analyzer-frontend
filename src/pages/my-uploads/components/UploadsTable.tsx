import React, { useEffect, useState } from "react";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/table";
import { useQueryClient } from "react-query";
import {
  Box,
  Center,
  IconButton,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import useUploadPage from "../../../apiCalls/hooks/useUploadPage";
import { CircularProgress } from "@chakra-ui/react";
import useSort from "../../../hooks/useSort";
import usePaging from "../../../hooks/usePaging";
import {
  deleteUploadCall,
  getUploadPage,
} from "../../../apiCalls/uploadApiCalls";
import Paginator from "../../../components/Paginator";
import { FiEdit2, FiMonitor, FiTrash } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { useHistory } from "react-router";

const headers = [
  {
    id: "name",
    name: "Name",
    sortable: true,
  },
  {
    id: "description",
    name: "Description",
    sortable: false,
  },
  {
    id: "createdAt",
    name: "Uploaded at",
    sortable: true,
  },
  {
    id: "actions",
    name: "Actions",
    sortable: false,
  },
] as const;

const UploadsTable = () => {
  const history = useHistory();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [totalPages, setTotalPages] = useState(0);
  const { pagination, handlePageChange, handleRowsPerPageChange } = usePaging();
  const { sort, handleSortChange } = useSort("createdAt");

  const { isLoading, isError, data, refetch } = useUploadPage(
    pagination.page,
    pagination.rowsPerPage,
    sort.column,
    sort.direction
  );

  const deleteUpload = async (uploadId: number) => {
    try {
      await deleteUploadCall(uploadId);
      await refetch();
    } catch (err) {
      toast({
        title: "Delete error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  React.useEffect(() => {
    if (data && !data.last) {
      queryClient.prefetchQuery(
        [
          "upload-page",
          pagination.page + 1,
          pagination.rowsPerPage,
          sort.column,
          sort.direction,
        ],
        () =>
          getUploadPage(
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
          {data.content.map((upload, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{upload.name}</Td>
              <Td maxW="200px" isTruncated>
                {upload.description}
              </Td>
              <Td>{new Date(upload.createdAt!).toLocaleString()}</Td>
              <Td>
                <Tooltip label="Edit" fontSize="md">
                  <IconButton
                    onClick={() => history.push("/edit-upload/" + upload.id!)}
                    variant="ghost"
                    aria-label="Edit"
                    icon={<FiEdit2 />}
                  />
                </Tooltip>
                <Tooltip label="Analyze" fontSize="md">
                  <IconButton
                    onClick={() => history.push("/analysis/" + upload.id!)}
                    variant="ghost"
                    aria-label="Analyze"
                    icon={<FiMonitor />}
                  />
                </Tooltip>
                <Tooltip label="Stats" fontSize="md">
                  <IconButton
                    variant="ghost"
                    aria-label="Stats"
                    icon={<BsGraphUp />}
                  />
                </Tooltip>
                <Tooltip label="Delete" fontSize="md">
                  <IconButton
                    onClick={() => deleteUpload(upload.id!)}
                    variant="ghost"
                    aria-label="Delete"
                    icon={<FiTrash />}
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
        <Text>Error loading uploads!</Text>
      ) : (
        <Text>No uploads available</Text>
      )}
    </Center>
  );
};
export default UploadsTable;
