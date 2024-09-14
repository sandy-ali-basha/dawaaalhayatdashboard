
import { useQueryClient, useMutation } from "react-query";
import { _Settings } from "api/settings/settings";

export const useDeleteSettings = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Settings.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["settings", page, count]);
      const previousData = queryClient.getQueriesData(["settings", page, count]);
      queryClient.setQueryData(["settings", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["settings", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["settings", page, count], context.prevuiosQuery);
    },
  });
};
