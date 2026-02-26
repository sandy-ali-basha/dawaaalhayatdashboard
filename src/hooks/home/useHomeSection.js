import { useQuery } from "react-query";
import { _Home } from "api/home/home";

export const useHomeSection = (id) => {

  const { data, isLoading, refetch } = useQuery(
    ["getHomeSection", id], // 👈 include id in key
    () =>
      _Home.getSection({
        id     // 👈 pass id to API
      }).then((res) => res),
    {
      enabled: !!id, // query runs only when id exists
    }
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
