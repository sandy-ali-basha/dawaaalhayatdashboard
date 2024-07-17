import { useState } from "react";
import { useQuery } from "react-query";
import { _Product_opt_val } from "api/product_opt_val/product_opt_val";

export const useProduct_opt_val = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["product_opt_val", id, page, count, query],
    () => _Product_opt_val.index(id).then((res) => res),
    {
      enabled: !!id, // Only run query if id is not null
    }
  );

  return {
    data,
    isLoading,
    id,
    page,
    setPage,
    count,
    setCount,
    refetch,
    setQuery,
  };
};
