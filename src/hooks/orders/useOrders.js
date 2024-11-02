import { useState } from "react";
import { useQuery } from "react-query";
import { _Orders } from "api/orders/orders";

export const useOrders = (enqueueSnackbar) => {
  const showSnackbar = (enqueueSnackbar, message, variant) => {
    if (typeof message !== "string") {
      console.error("Invalid message passed to showSnackbar:", message);
      return;
    }
  
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 4000,
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
    });
  };
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");
  const [previousData, setPreviousData] = useState(null); // Track previous data

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
        // Check for new orders
        if (previousData && newData?.length > previousData?.length) {
          showSnackbar(enqueueSnackbar, "There is a new order!", "info");
        }
        setPreviousData(newData); // Update previous data
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
  };
};
