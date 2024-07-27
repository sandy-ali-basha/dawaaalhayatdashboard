import { useState } from "react";
import { useQuery } from "react-query";
import { _Product_medicalForm } from "api/Product_medicalForm/Product_medicalForm";

export const useProduct_medicalForm = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["Product_medicalForm", id, page, count, query],
    () => _Product_medicalForm.index(id).then((res) => res),
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
