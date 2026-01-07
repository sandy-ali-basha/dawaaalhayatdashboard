
import { useQueryClient, useMutation } from "react-query";
import { _Contactus } from "api/contactus/contactus";

export const useDeleteContactus = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Contactus.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["contactus", page, count]);
      const previousData = queryClient.getQueriesData(["contactus", page, count]);
      queryClient.setQueryData(["contactus", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["contactus", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["contactus", page, count], context.prevuiosQuery);
    },
  });
};
