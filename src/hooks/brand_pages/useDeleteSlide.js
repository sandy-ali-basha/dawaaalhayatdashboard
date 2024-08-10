import { useQueryClient, useMutation } from "react-query";
import { _Brand_pages } from "api/brand_pages/brand_pages";

export const useDeleteSlide = () => {
  return useMutation((id) => _Brand_pages.deleteSlide(id), {
    onSuccess: () => {
      window.location.reload(); // Corrected this line
    },
  });
};
