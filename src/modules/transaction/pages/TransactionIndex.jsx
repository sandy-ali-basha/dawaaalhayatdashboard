
import {
  Typography,
  Box,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BoxStyled } from "components/styled/BoxStyled";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { useTransaction } from "hooks/transaction/useTransaction";
import { Check, ClosedCaption } from "@mui/icons-material";

const TransactionIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useTransaction();

  const navigate = useNavigate();

  const columns = useMemo(() => {
    return [
      t("user name"),
      t("payment transaction id"),
      t("booking id"),
      t("status"),
    ];
  }, [t]);

  const rows = useMemo(() => {
    return data?.transaction?.map((transaction, id) => (
      <TableRow sx={{ height: "65px" }} key={transaction.id} hover>
        <TableCell sx={{ minWidth: 50 }}>{transaction?.user_name ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>{transaction?.payment_transaction_id ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>{transaction?.booking_id ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          <Typography sx={{ background: transaction?.status === 'success' ? '#4fc4842e' : '#d4575838', color: 'text.main', borderRadius: '50px', p: '10px' }}>
            {transaction?.status ?? "Null"}
          </Typography>
        </TableCell>
      </TableRow >
    ));
  }, [data]);

  const handleCreate = () => navigate("create")

  return (
    <>
      {isLoading && <Loader />}

      <Box
        sx={{
          width: { sl: "300px" },
          backgroundColor: { xs: "background.main" },
          ml: { xs: "0px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "25px",
          }}
        >
          <Typography sx={{ color: "text.main" }} variant="h5">
            {t("transaction")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New transaction")}
          </Button>
        </Box>

        <BoxStyled sx={{ px: "10px" }}>
          <Table
            columns={columns}
            rows={rows}
            page={page}
            setPage={setPage}
            count={Math.ceil(data?.pagination?.total / count)}
          />
        </BoxStyled>
      </Box>
    </>
  );
};

export default TransactionIndex;
