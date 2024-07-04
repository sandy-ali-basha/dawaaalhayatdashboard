
import { useQueryClient, useMutation } from "react-query";
import { _Products } from "api/products/products";

export const useDeleteProducts = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Products.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["products", page, count]);
      const previousData = queryClient.getQueriesData(["products", page, count]);
      queryClient.setQueryData(["products", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["products", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["products", page, count], context.prevuiosQuery);
    },
  });
};
