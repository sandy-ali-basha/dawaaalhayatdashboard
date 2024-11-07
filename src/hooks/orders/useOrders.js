import { useState } from "react";
import { useQuery } from "react-query";
import { _Orders } from "api/orders/orders";

export const useOrders = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");
  const [previousDataCount, setPreviousDataCount] = useState(0);
  const [newOrderAlert, setNewOrderAlert] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    ["orders", page, count, query],
    () =>
      _Orders.index({
        query,
        page,
        count,
      }),
    {
      keepPreviousData: true,
      onSuccess: (newData) => {
        const newOrdersCount = newData?.data?.orders?.length ?? 0;

        // Set newOrderAlert to true only if there's a new order
        if (newOrdersCount > previousDataCount) {
          setNewOrderAlert(true);
        } else {
          setNewOrderAlert(false);
        }

        // Update the previous data count
        setPreviousDataCount(newOrdersCount);
      },
    }
  );

  return {
    data,
    isLoading,
    page,
    setPage,
    count,
    setCount,
    refetch,
    setQuery,
    newOrderAlert, // Expose the alert flag
  };
};
