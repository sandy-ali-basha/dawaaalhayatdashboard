import { useMutation, useQueryClient } from "react-query";
import { _Home } from "api/home/home";

export const useDeleteSlide = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Home.deleteSlide(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["home"]);
    },
  });
};
