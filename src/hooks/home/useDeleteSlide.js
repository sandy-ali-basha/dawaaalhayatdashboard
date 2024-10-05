import { useMutation } from "react-query";
import { _Brand_pages } from "api/brand_pages/brand_pages";
import { _Home } from "api/home/home";

export const useDeleteSlide = () => {
  return useMutation((id) => _Home.deleteSlide(id), {
    onSuccess: () => {
      window.location.reload(); // Corrected this line
    },
  });
};
