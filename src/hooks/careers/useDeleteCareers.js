
import { useQueryClient, useMutation } from "react-query";
import { _Careers } from "api/careers/careers";

export const useDeleteCareers = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Careers.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["careers", page, count]);
      const previousData = queryClient.getQueriesData(["careers", page, count]);
      queryClient.setQueryData(["careers", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["careers", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["careers", page, count], context.prevuiosQuery);
    },
  });
};
