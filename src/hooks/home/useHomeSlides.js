import { useQuery } from "react-query";
import { _Home } from "api/home/home";

export const useHomeSlides = (id) => {

  const { data, isLoading, refetch } = useQuery(["home_slides"], () =>
    _Home.getSlides().then((res) => res)
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
