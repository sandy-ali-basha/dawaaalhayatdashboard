import { useMutation, useQueryClient } from "react-query";
import { _Pharmacies } from "api/pharmacies/pharmacies";

export const useDeletePharmacy = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Pharmacies.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["pharmacies"]);
    },
  });
};
