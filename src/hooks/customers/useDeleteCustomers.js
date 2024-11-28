
import { useQueryClient, useMutation } from "react-query";
import { _Customers } from "api/customers/customers";

export const useDeleteCustomers = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Customers.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["customers", page, count]);
      const previousData = queryClient.getQueriesData(["customers", page, count]);
      queryClient.setQueryData(["customers", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["customers", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["customers", page, count], context.prevuiosQuery);
    },
  });
};
