
import { useQueryClient, useMutation } from "react-query";
import { _Transaction } from "api/transaction/transaction";

export const useDeleteTransaction = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Transaction.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["transaction", page, count]);
      const previousData = queryClient.getQueriesData(["transaction", page, count]);
      queryClient.setQueryData(["transaction", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["transaction", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["transaction", page, count], context.prevuiosQuery);
    },
  });
};
