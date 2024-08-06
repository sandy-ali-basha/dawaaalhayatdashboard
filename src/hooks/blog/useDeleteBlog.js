
import { useQueryClient, useMutation } from "react-query";
import { _Blog } from "api/blog/blog";

export const useDeleteBlog = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Blog.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["blog", page, count]);
      const previousData = queryClient.getQueriesData(["blog", page, count]);
      queryClient.setQueryData(["blog", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["blog", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["blog", page, count], context.prevuiosQuery);
    },
  });
};
