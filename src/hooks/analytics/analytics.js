// https://dev.dawaaalhayat.com/api/DashboardAnalytics

import { _Analytics } from "api/analytics/analytics";
import { useQuery } from "react-query";

export const useAnalytics = () => {
  const { data, isLoading, refetch } = useQuery(["Analytics"], () =>
    _Analytics.index().then((res) => res)
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
