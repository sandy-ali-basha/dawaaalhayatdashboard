
import { useQueryClient, useMutation } from "react-query";
import { _Product_attributes } from "api/product_attributes/product_attributes";

export const useDeleteProduct_attributes = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Product_attributes.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["product_attributes", page, count]);
      const previousData = queryClient.getQueriesData(["product_attributes", page, count]);
      queryClient.setQueryData(["product_attributes", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["product_attributes", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["product_attributes", page, count], context.prevuiosQuery);
    },
  });
};
