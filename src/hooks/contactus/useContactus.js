
import { useState } from "react";
import { useQuery } from "react-query";
import { _Contactus } from "api/contactus/contactus";

export const useContactus = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["contactus", page, count, query],
    () =>
      _Contactus
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
