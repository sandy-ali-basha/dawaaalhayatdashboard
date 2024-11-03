import { useState, useRef } from "react";
import { useQuery } from "react-query";
import { _Orders } from "api/orders/orders";
import { useSnackbar } from "notistack";

export const useOrders = () => {
  const { enqueueSnackbar } = useSnackbar();
  const showSnackbar = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 4000,
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
    });
  };

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");
  const [previousDataCount, setPreviousDataCount] = useState(0);
  const alertShownRef = useRef(false); // Track if alert has been shown

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

        // Show snackbar only if there are new orders and it hasn't already shown an alert
        if (newOrdersCount > previousDataCount && !alertShownRef.current) {
          // showSnackbar("There is a new order!", "info");
          // alertShownRef.current = true; // Mark that we've shown an alert
        }

        // Update the previous data count
        setPreviousDataCount(newOrdersCount);

        // Reset the alert flag after the data has updated
        alertShownRef.current = false;
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
