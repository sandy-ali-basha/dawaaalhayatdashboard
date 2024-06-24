import { _axios } from "interceptor/http-config";
import { useQueryClient, useMutation } from "react-query";
export const useChangeStatus = ({ status, id }) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => _axios.get('/terms/change-status/'+ id),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(["terms", true, 1, 10]);
        const previousData = queryClient.getQueriesData([
          "terms",
          true,
          1,
          10,
        ]);
        queryClient.setQueryData(
          ["terms", true, 1, 10],
          (oldQueryData) => {
            const oldQueryDataCopy = oldQueryData?.termss?.filter(
              (old) => +old.id !== +id
            )[0];
            const queryUpdated = oldQueryData?.termss?.filter(
              (old) => +old.id === +id
            )[0];

            return [
              { ...oldQueryDataCopy },
              {
                ...queryUpdated,
                status: status === "active" && "change-status",
              },
            ];
          }
        );
        return {
          previousData,
        };
      },
      onSuccess: () => {
        return queryClient.invalidateQueries(["terms", true, 1, 10]);
      },
      onError: (_error, _hero, context) => {
        queryClient.setQueryData(
          ["terms", true, 1, 10],
          context.prevuiosQuery
        );
      },
    }
  );
};
