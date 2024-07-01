
import { useQueryClient, useMutation } from "react-query";
import { _Brand } from "api/brand/brand";

export const useDeleteBrand = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Brand.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["brand", page, count]);
      const previousData = queryClient.getQueriesData(["brand", page, count]);
      queryClient.setQueryData(["brand", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["brand", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["brand", page, count], context.prevuiosQuery);
    },
  });
};
