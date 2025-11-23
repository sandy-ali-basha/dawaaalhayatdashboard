import { useState } from "react";
import { useQuery } from "react-query";
import { _Home } from "api/home/home";

export const useHomeSection = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["getHomeSection", id, page, count, query], // 👈 include id in key
    () =>
      _Home.getSection({
        id,      // 👈 pass id to API
        query,
        page,
        count,
      }).then((res) => res),
    {
      enabled: !!id, // query runs only when id exists
    }
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
