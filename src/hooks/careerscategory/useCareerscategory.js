
import { useState } from "react";
import { useQuery } from "react-query";
import { _Careerscategory } from "api/careerscategory/careerscategory";

export const useCareerscategory = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["careerscategory", page, count, query],
    () =>
      _Careerscategory
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
