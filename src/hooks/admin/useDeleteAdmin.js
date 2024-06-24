import { _Admin } from "api/admin/admin";
import { useQueryClient, useMutation } from "react-query";

export const useDeleteAdmin = ({}) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Admin.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["admin"]);
      const previousData = queryClient.getQueriesData(["admin"]);
      queryClient.setQueryData(["admin"], (oldQueryData) => {
        const oldQueryDataCopy = oldQueryData?.admins.filter(
          (old) => +old.id !== +id
        );
        return oldQueryDataCopy;
      });
      return {
        previousData,
      };
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(["admin"]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["admin"], context.prevuiosQuery);
    },
  });
};
