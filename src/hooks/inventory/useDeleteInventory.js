
import { useQueryClient, useMutation } from "react-query";
import { _Inventory } from "api/inventory/inventory";

export const useDeleteInventory = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Inventory.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["inventory", page, count]);
      const previousData = queryClient.getQueriesData(["inventory", page, count]);
      queryClient.setQueryData(["inventory", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["inventory", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["inventory", page, count], context.prevuiosQuery);
    },
  });
};
