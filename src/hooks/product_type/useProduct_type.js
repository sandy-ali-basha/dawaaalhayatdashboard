
import { useState } from "react";
import { useQuery } from "react-query";
import { _Product_type } from "api/product_type/product_type";

export const useProduct_type = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["product_type", page, count, query],
    () =>
      _Product_type
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
