
import { useState } from "react";
import { useQuery } from "react-query";
import { _Heroimage } from "api/heroimage/heroimage";

export const useHeroimage = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["heroimage", page, count, query],
    () =>
      _Heroimage
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
