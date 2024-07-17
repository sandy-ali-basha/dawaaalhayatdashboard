
import { useQueryClient, useMutation } from "react-query";
import { _Product_options } from "api/product_options/product_options";

export const useDeleteProduct_options = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Product_options.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["product_options", page, count]);
      const previousData = queryClient.getQueriesData(["product_options", page, count]);
      queryClient.setQueryData(["product_options", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["product_options", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["product_options", page, count], context.prevuiosQuery);
    },
  });
};
