import { useState } from "react";
import { useQuery } from "react-query";
import { _Admin } from "api/admin/admin";

export const useAdmin = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["admin", page, count, query],
    () => _Admin.index({ page, count, query }).then((res) => res)
  );

  return {
    data,
    isLoading,

    page,
    setPage,
    count,
    setCount,
    refetch,
    setQuery,
  };
};
