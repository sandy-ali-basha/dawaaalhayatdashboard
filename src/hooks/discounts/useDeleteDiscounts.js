
import { useQueryClient, useMutation } from "react-query";
import { _Discounts } from "api/discounts/discounts";

export const useDeleteDiscounts = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Discounts.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["discounts", page, count]);
      const previousData = queryClient.getQueriesData(["discounts", page, count]);
      queryClient.setQueryData(["discounts", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["discounts", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["discounts", page, count], context.prevuiosQuery);
    },
  });
};
