
import { useQueryClient, useMutation } from "react-query";
import { _Aboutus } from "api/aboutus/aboutus";

export const useDeleteAboutus = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Aboutus.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["aboutus", page, count]);
      const previousData = queryClient.getQueriesData(["aboutus", page, count]);
      queryClient.setQueryData(["aboutus", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["aboutus", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["aboutus", page, count], context.prevuiosQuery);
    },
  });
};
