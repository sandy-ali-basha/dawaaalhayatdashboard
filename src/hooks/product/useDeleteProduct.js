
import { useQueryClient, useMutation } from "react-query";
import { _Product } from "api/product/product";

export const useDeleteProduct = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Product.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["product", page, count]);
      const previousData = queryClient.getQueriesData(["product", page, count]);
      queryClient.setQueryData(["product", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["product", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["product", page, count], context.prevuiosQuery);
    },
  });
};
