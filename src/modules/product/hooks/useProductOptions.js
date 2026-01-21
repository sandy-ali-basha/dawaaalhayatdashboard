
import { useProduct_options_flavors, useProduct_options_packings } from "hooks/product_options/useProduct_options";


export const useProductOptions = () => {

  const { data: packings, isLoading: packingsIsLoading } =useProduct_options_packings();

  const { data: flavors, isLoading: flavorsIsLoading } = useProduct_options_flavors();

  return {
    packings,
    flavors,
    packingsIsLoading,
    flavorsIsLoading,
  };
};
