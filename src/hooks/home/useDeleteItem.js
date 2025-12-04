import { useMutation, useQueryClient } from "react-query";
import { _Home } from "api/home/home";

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Home.deleteItem(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["home"]);
    },
  });
};
