
import { useState } from "react";
import { useQuery } from "react-query";
import { _Brand_pages } from "api/brand_pages/brand_pages";

export const useBrand_pages = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["brand_pages", page, count, query],
    () =>
      _Brand_pages
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
