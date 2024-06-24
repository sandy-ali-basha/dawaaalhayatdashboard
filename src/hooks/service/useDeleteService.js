
import { useQueryClient, useMutation } from "react-query";
import { _Service } from "api/service/service";

export const useDeleteService = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Service.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["service", page, count]);
      const previousData = queryClient.getQueriesData(["service", page, count]);
      queryClient.setQueryData(["service", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["service", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["service", page, count], context.prevuiosQuery);
    },
  });
};
