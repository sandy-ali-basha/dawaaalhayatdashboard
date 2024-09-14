import { _axios } from "interceptor/http-config";
import { useQueryClient, useMutation } from "react-query";

export const useChangeStatus = ({ status, id }) => {
  const queryClient = useQueryClient();
  return useMutation(() => _axios.post(`/orders/${id}/change-status/`, { status }), {
    onMutate: async () => {
      await queryClient.cancelQueries(["orders", true, 1, 10]);
      const previousData = queryClient.getQueriesData(["orders", true, 1, 10]);

      queryClient.setQueryData(["orders", true, 1, 10], (oldQueryData) => {
        const updatedOrders = oldQueryData.orderss.map((order) =>
          order.id === id ? { ...order, status } : order
        );
        return { ...oldQueryData, orderss: updatedOrders };
      });

      return {
        previousData,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", true, 1, 10]);
    },
    onError: (_error, _id, context) => {
      queryClient.setQueryData(["orders", true, 1, 10], context.previousData);
    },
  });
};
