import { _axios } from "interceptor/http-config";
import { useQueryClient, useMutation } from "react-query";
export const useChangeStatus = ({ status, id }) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => _axios.get('/product_type/change-status/'+ id),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(["product_type", true, 1, 10]);
        const previousData = queryClient.getQueriesData([
          "product_type",
          true,
          1,
          10,
        ]);
        queryClient.setQueryData(
          ["product_type", true, 1, 10],
          (oldQueryData) => {
            const oldQueryDataCopy = oldQueryData?.product_types?.filter(
              (old) => +old.id !== +id
            )[0];
            const queryUpdated = oldQueryData?.product_types?.filter(
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
        return queryClient.invalidateQueries(["product_type", true, 1, 10]);
      },
      onError: (_error, _hero, context) => {
        queryClient.setQueryData(
          ["product_type", true, 1, 10],
          context.prevuiosQuery
        );
      },
    }
  );
};
