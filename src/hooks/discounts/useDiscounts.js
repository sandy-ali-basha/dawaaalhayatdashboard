
import { useState } from "react";
import { useQuery } from "react-query";
import { _Discounts } from "api/discounts/discounts";

export const useDiscounts = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["discounts", page, count, query],
    () =>
      _Discounts
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
