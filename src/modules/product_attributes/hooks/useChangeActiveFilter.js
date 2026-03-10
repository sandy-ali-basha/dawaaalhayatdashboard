import { _axios } from "interceptor/http-config";
import { useQueryClient, useMutation } from "react-query";

export const useChangeActiveFilter = ({ id }) => {
  const queryClient = useQueryClient();

  return useMutation(() => _axios.post(`/product_attributes/toggle-active-filter/${id}`), {
    onSuccess: () => queryClient.invalidateQueries(["product_attributes"]),
  });
};
