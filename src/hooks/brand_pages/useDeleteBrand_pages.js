
import { useQueryClient, useMutation } from "react-query";
import { _Brand_pages } from "api/brand_pages/brand_pages";

export const useDeleteBrand_pages = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Brand_pages.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["brand_pages", page, count]);
      const previousData = queryClient.getQueriesData(["brand_pages", page, count]);
      queryClient.setQueryData(["brand_pages", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["brand_pages", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["brand_pages", page, count], context.prevuiosQuery);
    },
  });
};
