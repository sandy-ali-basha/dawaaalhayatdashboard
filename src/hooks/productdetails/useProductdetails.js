import { useState } from "react";
import { useQuery } from "react-query";
import { _Productdetails } from "api/productdetails/productdetails";

export const useProductdetails = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["productdetails", page, count, query, id],
    () =>
      _Productdetails.index({
        query,
        page,
        count,
        id,
      }).then((res) => res),
    {
      enabled: !!id, // Only run query if `id` is truthy (not null or undefined)
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
