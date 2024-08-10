import { _axios } from "interceptor/http-config";
import { useQueryClient, useMutation } from "react-query";
export const useChangeStatus = ({ status, id }) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => _axios.get('/brand_pages/change-status/'+ id),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(["brand_pages", true, 1, 10]);
        const previousData = queryClient.getQueriesData([
          "brand_pages",
          true,
          1,
          10,
        ]);
        queryClient.setQueryData(
          ["brand_pages", true, 1, 10],
          (oldQueryData) => {
            const oldQueryDataCopy = oldQueryData?.brand_pagess?.filter(
              (old) => +old.id !== +id
            )[0];
            const queryUpdated = oldQueryData?.brand_pagess?.filter(
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
        return queryClient.invalidateQueries(["brand_pages", true, 1, 10]);
      },
      onError: (_error, _hero, context) => {
        queryClient.setQueryData(
          ["brand_pages", true, 1, 10],
          context.prevuiosQuery
        );
      },
    }
  );
};
