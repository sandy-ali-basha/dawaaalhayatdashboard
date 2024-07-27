
import { useQueryClient, useMutation } from "react-query";
import { _Product_medicalForm } from "api/Product_medicalForm/Product_medicalForm";

export const useDeleteProduct_medicalForm = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Product_medicalForm.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["Product_medicalForm", page, count]);
      const previousData = queryClient.getQueriesData(["Product_medicalForm", page, count]);
      queryClient.setQueryData(["Product_medicalForm", page, count], (oldQueryData) => {
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
      return queryClient.invalidateQueries(["Product_medicalForm", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["Product_medicalForm", page, count], context.prevuiosQuery);
    },
  });
};
