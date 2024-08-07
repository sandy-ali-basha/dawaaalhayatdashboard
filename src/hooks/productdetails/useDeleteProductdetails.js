
import { useQueryClient, useMutation } from "react-query";
import { _Productdetails } from "api/productdetails/productdetails";

export const useDeleteProductdetails = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Productdetails.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["productdetails", page, count]);
      const previousData = queryClient.getQueriesData(["productdetails", page, count]);
      queryClient.setQueryData(["productdetails", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["productdetails", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["productdetails", page, count], context.prevuiosQuery);
    },
  });
};
