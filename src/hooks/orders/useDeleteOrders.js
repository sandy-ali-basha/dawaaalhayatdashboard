
import { useQueryClient, useMutation } from "react-query";
import { _Orders } from "api/orders/orders";

export const useDeleteOrders = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Orders.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["orders", page, count]);
      const previousData = queryClient.getQueriesData(["orders", page, count]);
      queryClient.setQueryData(["orders", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["orders", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["orders", page, count], context.prevuiosQuery);
    },
  });
};
