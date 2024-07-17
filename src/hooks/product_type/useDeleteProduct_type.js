
import { useQueryClient, useMutation } from "react-query";
import { _Product_type } from "api/product_type/product_type";

export const useDeleteProduct_type = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Product_type.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["product_type", page, count]);
      const previousData = queryClient.getQueriesData(["product_type", page, count]);
      queryClient.setQueryData(["product_type", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["product_type", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["product_type", page, count], context.prevuiosQuery);
    },
  });
};
