import { useQuery } from "react-query";
import { _Notifications } from "api/notifications/notifications";

export const useNotificationsUnreadCount = () => {
  const { data, isLoading, refetch } = useQuery(
    ["notifications-unread-count"],
    () => _Notifications.unreadCount().then((res) => res),
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
