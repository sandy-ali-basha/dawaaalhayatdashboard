import React, { useMemo } from "react";

import {
  Typography,
  Box,
  TableRow,
  TableCell,
  Button,
  Rating,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { BoxStyled } from "components/styled/BoxStyled";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { useReview } from "hooks/review/useReview";

const ReviewIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useReview();
  const navigate = useNavigate();
  const columns = useMemo(() => {
    return [
      t("user_name"),
      t("comment"),
      t("rate"),
    ];
  }, [t]);


  const rows = useMemo(() => {
    return data?.reviews?.map((review, id) => (
      <TableRow sx={{ height: "65px" }} key={review.id} hover>
        <TableCell sx={{ minWidth: 50 }}>{review?.user_name ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>{review?.comment ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50, maxWidth: '200' }}>
          <Rating value={review?.rate} readOnly />
        </TableCell>
      </TableRow>
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
            {t("review")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New review")}
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

export default ReviewIndex;
