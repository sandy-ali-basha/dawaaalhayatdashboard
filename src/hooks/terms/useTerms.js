import { useQuery } from "react-query";
import { _Terms } from "api/terms/terms";

export const useTerms = (id) => {
  const { data, isLoading, refetch } = useQuery(["terms"], () =>
    _Terms.index().then((res) => res)
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
