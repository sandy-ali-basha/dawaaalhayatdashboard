
import { useQueryClient, useMutation } from "react-query";
import { _Heroimage } from "api/heroimage/heroimage";

export const useDeleteHeroimage = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Heroimage.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["heroimage", page, count]);
      const previousData = queryClient.getQueriesData(["heroimage", page, count]);
      queryClient.setQueryData(["heroimage", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["heroimage", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["heroimage", page, count], context.prevuiosQuery);
    },
  });
};
