
import { useState } from "react";
import { useQuery } from "react-query";
import { _Inventory } from "api/inventory/inventory";

export const useInventory = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["inventory", page, count, query],
    () =>
      _Inventory
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
