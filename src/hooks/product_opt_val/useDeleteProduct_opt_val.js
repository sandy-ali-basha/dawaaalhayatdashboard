
import { useQueryClient, useMutation } from "react-query";
import { _Product_opt_val } from "api/product_opt_val/product_opt_val";

export const useDeleteProduct_opt_val = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Product_opt_val.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["product_opt_val", page, count]);
      const previousData = queryClient.getQueriesData(["product_opt_val", page, count]);
      queryClient.setQueryData(["product_opt_val", page, count], (oldQueryData) => {
        const oldQueryDataCopy = oldQueryData?.companies.filter(
          (old) => +old.id !== +id
        );
        return oldQueryDataCopy;
      });
      return {
        previousData,
      }
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(["product_opt_val", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["product_opt_val", page, count], context.prevuiosQuery);
    },
  });
};
