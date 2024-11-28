
import { useQueryClient, useMutation } from "react-query";
import { _Regions } from "api/regions/regions";

export const useDeleteRegions = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Regions.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["regions", page, count]);
      const previousData = queryClient.getQueriesData(["regions", page, count]);
      queryClient.setQueryData(["regions", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["regions", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["regions", page, count], context.prevuiosQuery);
    },
  });
};
