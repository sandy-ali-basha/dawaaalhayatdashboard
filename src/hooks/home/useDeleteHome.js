
import { useQueryClient, useMutation } from "react-query";
import { _Home } from "api/home/home";

export const useDeleteHome = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Home.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["home", page, count]);
      const previousData = queryClient.getQueriesData(["home", page, count]);
      queryClient.setQueryData(["home", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["home", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["home", page, count], context.prevuiosQuery);
    },
  });
};
