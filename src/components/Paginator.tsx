import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  CircularProgress,
  HStack,
  IconButton,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

const rowsPerPageOptions = [3, 5, 10, 15, 25, 50, 100];

interface Props {
  isLoading: boolean;
  page: number;
  totalPages: number;
  rowsPerPage: number;
  handleChangeRowsPerPage: (rowsPerPage: number) => void;
  handlePageChange: (rowsPerPage: number) => void;
}

const Paginator = ({
  isLoading,
  page,
  totalPages,
  rowsPerPage,
  handleChangeRowsPerPage,
  handlePageChange,
}: Props) => {
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("rowsPerPage", rowsPerPage.toString());

    history.push({ search: params.toString() });
  }, [page, rowsPerPage, history]);

  return (
    <HStack justifyContent="center">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {page > 0 && (
            <IconButton
              aria-label="Previous page"
              icon={<ArrowLeftIcon />}
              onClick={() => handlePageChange(page - 1)}
            />
          )}
          <Text>
            Page {page + 1}/{totalPages}
          </Text>
          {page < totalPages - 1 && (
            <IconButton
              aria-label="Next page"
              icon={<ArrowRightIcon />}
              onClick={() => handlePageChange(page + 1)}
            />
          )}
          <Select
            maxW="200px"
            value={rowsPerPage}
            onChange={(e) => handleChangeRowsPerPage(+e.target.value)}
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option} uploads per page
              </option>
            ))}
          </Select>
        </>
      )}
    </HStack>
  );
};

export default Paginator;
