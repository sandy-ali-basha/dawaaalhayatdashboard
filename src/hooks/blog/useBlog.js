
import { useState } from "react";
import { useQuery } from "react-query";
import { _Blog } from "api/blog/blog";

export const useBlog = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["blog", page, count, query],
    () =>
      _Blog
        .index({
          query,
          page,
          count,
        })
        .then((res) => res)
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
