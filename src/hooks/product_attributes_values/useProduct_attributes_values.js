import { useState } from "react";
import { useQuery } from "react-query";
import { _Product_attributes_values } from "api/product_attributes_values/product_attributes_values";

export const useProduct_attributes_values = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["product_attributes_values", page, count, query, id],
    () =>
      _Product_attributes_values
        .index({
          query,
          page,
          count,
          id,
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
