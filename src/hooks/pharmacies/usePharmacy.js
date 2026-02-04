import { useQuery } from "react-query";
import { _Pharmacies } from "api/pharmacies/pharmacies";

export const usePharmacy = (id) => {
  const query = useQuery(["pharmacies", id], () => _Pharmacies.get(id), {
    enabled: Boolean(id),
  });
  return query;
};
