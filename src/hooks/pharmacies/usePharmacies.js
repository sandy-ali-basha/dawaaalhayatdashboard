import { useQuery } from "react-query";
import { _Pharmacies } from "api/pharmacies/pharmacies";

export const usePharmacies = () => {
  const query = useQuery(["pharmacies"], () => _Pharmacies.list());
  return query;
};
