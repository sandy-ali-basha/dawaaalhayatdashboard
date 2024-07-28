
import { useQueryClient, useMutation } from "react-query";
import { _Product_attributes_values } from "api/product_attributes_values/product_attributes_values";

export const useDeleteProduct_attributes_values = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Product_attributes_values.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["product_attributes_values", page, count]);
      const previousData = queryClient.getQueriesData(["product_attributes_values", page, count]);
      queryClient.setQueryData(["product_attributes_values", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["product_attributes_values", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["product_attributes_values", page, count], context.prevuiosQuery);
    },
  });
};
