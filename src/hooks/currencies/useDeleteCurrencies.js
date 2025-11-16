
import { useQueryClient, useMutation } from "react-query";
import { _Currencies } from "api/currencies/currencies";

export const useDeleteCurrencies = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Currencies.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["currencies", page, count]);
      const previousData = queryClient.getQueriesData(["currencies", page, count]);
      queryClient.setQueryData(["currencies", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["currencies", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["currencies", page, count], context.prevuiosQuery);
    },
  });
};
