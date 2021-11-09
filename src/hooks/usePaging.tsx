import { useState } from "react";
import { useLocation } from "react-router";

const usePaging = (defaultPage?: number, defaultRowsPerPage?: number) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const page = query.get("page") !== null ? +query.get("page")!! : null;
  const rowsPerPage =
    query.get("rowsPerPage") !== null ? +query.get("rowsPerPage")!! : null;

  const [pagination, setPagination] = useState({
    page: page || defaultPage || 0,
    rowsPerPage: rowsPerPage || defaultRowsPerPage || 10,
  });

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setPagination({ rowsPerPage: newRowsPerPage, page: 0 });
  };

  const handlePageChange = (newPage: number) => {
    setPagination({ ...pagination, page: newPage });
  };

  return { pagination, handleRowsPerPageChange, handlePageChange };
};

export default usePaging;
