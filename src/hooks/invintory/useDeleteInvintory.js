
import { useQueryClient, useMutation } from "react-query";
import { _Invintory } from "api/invintory/invintory";

export const useDeleteInvintory = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Invintory.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["invintory", page, count]);
      const previousData = queryClient.getQueriesData(["invintory", page, count]);
      queryClient.setQueryData(["invintory", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["invintory", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["invintory", page, count], context.prevuiosQuery);
    },
  });
};
