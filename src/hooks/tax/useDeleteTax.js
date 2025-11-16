
import { useQueryClient, useMutation } from "react-query";
import { _Tax } from "api/tax/tax";

export const useDeleteTax = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Tax.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["tax", page, count]);
      const previousData = queryClient.getQueriesData(["tax", page, count]);
      queryClient.setQueryData(["tax", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["tax", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["tax", page, count], context.prevuiosQuery);
    },
  });
};
