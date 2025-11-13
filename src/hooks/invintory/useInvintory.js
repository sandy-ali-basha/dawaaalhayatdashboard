
import { useState } from "react";
import { useQuery } from "react-query";
import { _Invintory } from "api/invintory/invintory";

export const useInvintory = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["invintory", page, count, query],
    () =>
      _Invintory
        .index({
          id,
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
