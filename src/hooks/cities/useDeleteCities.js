
import { useQueryClient, useMutation } from "react-query";
import { _cities } from "api/cities/cities";

export const useDeleteCities = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _cities.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["cities", page, count]);
      const previousData = queryClient.getQueriesData(["cities", page, count]);
      queryClient.setQueryData(["cities", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["cities", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["cities", page, count], context.prevuiosQuery);
    },
  });
};
