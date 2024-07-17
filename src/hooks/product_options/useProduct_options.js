
import { useState } from "react";
import { useQuery } from "react-query";
import { _Product_options } from "api/product_options/product_options";

export const useProduct_options = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["product_options", page, count, query],
    () =>
      _Product_options
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
