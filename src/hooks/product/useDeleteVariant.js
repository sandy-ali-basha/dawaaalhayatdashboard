import { _Product } from "api/product/product";
import { useQueryClient, useMutation } from "react-query";

export const useDeletevariant = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Product.deleteVariant(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["variant", page, count]);
      const previousData = queryClient.getQueriesData(["variant", page, count]);
      queryClient.setQueryData(["variant", page, count], (oldQueryData) => {
        const oldQueryDataCopy = oldQueryData?.companies.filter(
          (old) => +old.id !== +id  
        );
        return oldQueryDataCopy;
      });
      return {
        previousData,
      };
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(["variant", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["variant", page, count], context.prevuiosQuery);
    },
  });
};
