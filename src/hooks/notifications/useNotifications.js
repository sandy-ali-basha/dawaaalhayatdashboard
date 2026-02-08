import { useQuery } from "react-query";
import { _Notifications } from "api/notifications/notifications";

export const useNotifications = () => {
  const { data, isLoading, refetch } = useQuery(
    ["notifications"],
    () => _Notifications.index().then((res) => res),
    {
      refetchInterval: 30000,
      refetchOnWindowFocus: true,
    }
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
