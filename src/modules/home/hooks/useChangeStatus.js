import { _axios } from "interceptor/http-config";
import { useQueryClient, useMutation } from "react-query";
export const useChangeStatus = ({ status, id }) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => _axios.get('/home/change-status/'+ id),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(["home", true, 1, 10]);
        const previousData = queryClient.getQueriesData([
          "home",
          true,
          1,
          10,
        ]);
        queryClient.setQueryData(
          ["home", true, 1, 10],
          (oldQueryData) => {
            const oldQueryDataCopy = oldQueryData?.homes?.filter(
              (old) => +old.id !== +id
            )[0];
            const queryUpdated = oldQueryData?.homes?.filter(
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
        return queryClient.invalidateQueries(["home", true, 1, 10]);
      },
      onError: (_error, _hero, context) => {
        queryClient.setQueryData(
          ["home", true, 1, 10],
          context.prevuiosQuery
        );
      },
    }
  );
};
