
import { useQueryClient, useMutation } from "react-query";
import { _Careerscategory } from "api/careerscategory/careerscategory";

export const useDeleteCareerscategory = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Careerscategory.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["careerscategory", page, count]);
      const previousData = queryClient.getQueriesData(["careerscategory", page, count]);
      queryClient.setQueryData(["careerscategory", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["careerscategory", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["careerscategory", page, count], context.prevuiosQuery);
    },
  });
};
