
import { useQueryClient, useMutation } from "react-query";
import { _Profile } from "api/profile/profile";

export const useDeleteProfile = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Profile.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["profile", page, count]);
      const previousData = queryClient.getQueriesData(["profile", page, count]);
      queryClient.setQueryData(["profile", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["profile", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["profile", page, count], context.prevuiosQuery);
    },
  });
};
