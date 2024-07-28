
import { useState } from "react";
import { useQuery } from "react-query";
import { _Product_attributes } from "api/product_attributes/product_attributes";

export const useProduct_attributes = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["product_attributes", page, count, query],
    () =>
      _Product_attributes
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
