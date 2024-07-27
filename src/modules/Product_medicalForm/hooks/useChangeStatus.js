import { _axios } from "interceptor/http-config";
import { useQueryClient, useMutation } from "react-query";
export const useChangeStatus = ({ status, id }) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => _axios.get('/Product_medicalForm/change-status/'+ id),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(["Product_medicalForm", true, 1, 10]);
        const previousData = queryClient.getQueriesData([
          "Product_medicalForm",
          true,
          1,
          10,
        ]);
        queryClient.setQueryData(
          ["Product_medicalForm", true, 1, 10],
          (oldQueryData) => {
            const oldQueryDataCopy = oldQueryData?.Product_medicalForms?.filter(
              (old) => +old.id !== +id
            )[0];
            const queryUpdated = oldQueryData?.Product_medicalForms?.filter(
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
        return queryClient.invalidateQueries(["Product_medicalForm", true, 1, 10]);
      },
      onError: (_error, _hero, context) => {
        queryClient.setQueryData(
          ["Product_medicalForm", true, 1, 10],
          context.prevuiosQuery
        );
      },
    }
  );
};
