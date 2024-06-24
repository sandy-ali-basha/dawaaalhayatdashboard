
import { useQueryClient, useMutation } from "react-query";
import { _Terms } from "api/terms/terms";

export const useDeleteTerms = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Terms.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["terms", page, count]);
      const previousData = queryClient.getQueriesData(["terms", page, count]);
      queryClient.setQueryData(["terms", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["terms", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["terms", page, count], context.prevuiosQuery);
    },
  });
};
