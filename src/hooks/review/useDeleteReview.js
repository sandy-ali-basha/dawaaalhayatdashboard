
import { useQueryClient, useMutation } from "react-query";
import { _Review } from "api/review/review";

export const useDeleteReview = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Review.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["review", page, count]);
      const previousData = queryClient.getQueriesData(["review", page, count]);
      queryClient.setQueryData(["review", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["review", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["review", page, count], context.prevuiosQuery);
    },
  });
};
