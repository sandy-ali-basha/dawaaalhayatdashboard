import { useQuery } from "react-query";
import { _Product_options } from "api/product_options/product_options";

export const useProduct_options_packings = () => {
  const { data, isLoading, refetch } = useQuery(["packings"], () =>
    _Product_options.packings().then((res) => res)
  );

  return {
    data,
    isLoading,
    refetch,
  };
};

export const useProduct_options_flavors = () => {
  const { data, isLoading, refetch } = useQuery(["flavors"], () =>
    _Product_options.flavors().then((res) => res)
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
