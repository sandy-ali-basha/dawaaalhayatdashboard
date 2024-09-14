import {
  Typography,
  Box,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Button,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { BoxStyled } from "components/styled/BoxStyled";
// import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
// import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useDiscounts } from "hooks/discounts/useDiscounts";
import DiscountsUpdate from "./DiscountsUpdate";
import DeleteDialog from "../components/Dialog";

const DiscountsIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useDiscounts();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [
      t("name"),
      t("handle"),
      t("coupon"),
      t("starts"),
      t("ends"),
      t("uses"),
      t("max uses"),
      t("percentage"),
      t("operations"),
    ];
  }, [t]);

  // const handleView = useCallback(
  //   (id) => {
  //     navigate("view/" + id);
  //   },
  //   [navigate]
  // );
  // const handleEdit = useCallback(
  //   (id) => {
  //     setEditedID(id);
  //   },
  //   [setEditedID]
  // );
  const DiscountsDisplay = (data) => {
    return (
      <div>
        {data?.fixed_value ? (
          Object.entries(data?.fixed_values).map(([currency, value]) => (
            <Chip
              color="info"
              label={
                <p key={currency}>
                  {currency}: {value}
                </p>
              }
            ></Chip>
          ))
        ) : (
          <Chip color="success" label={`${data?.percentage}%`}></Chip>
        )}
      </div>
    );
  };
  const rows = useMemo(() => {
    return data?.data?.dicounts?.map((discounts, id) => (
      <TableRow sx={{ height: "65px" }} key={discounts.id} hover>
        <TableCell>{discounts?.name ?? "Null"}</TableCell>
        <TableCell>{discounts?.handle ?? "Null"}</TableCell>
        <TableCell>{discounts?.coupon ?? "Null"}</TableCell>
        <TableCell>{discounts?.starts_at ?? "Null"}</TableCell>
        <TableCell>{discounts?.ends_at ?? "Null"}</TableCell>
        <TableCell>{discounts?.uses ?? "Null"}</TableCell>
        <TableCell>{discounts?.max_uses ?? "Null"}</TableCell>
        <TableCell>{DiscountsDisplay(discounts?.data)}</TableCell>
        {/* <TableCell sx={{ minWidth: 120 }} align="center">
          <ChangeStatus
            id={discounts.id}
            action={discounts.status === "active" && "change-status"}
          >
            {discounts.status === "Active" ? t("Active") : t("Not Active")}
          </ChangeStatus>
        </TableCell> */}
        <TableCell
          align="center"
          sx={{
            minWidth: 50,
          }}
        >
          {/* <IconButton onClick={() => handleEdit(discounts?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton> */}
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={discounts?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
          {/* <IconButton onClick={() => handleView(discounts.id)}>
            <Tooltip title={direction === "ltr" ? "View" : "مشاهدة"}>
              <VisibilityTwoToneIcon color="primary" />
            </Tooltip>
          </IconButton> */}
        </TableCell>
      </TableRow>
    ));
  }, [data, count, direction, page]);

  const handleCreate = () => navigate("create");

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <DiscountsUpdate id={editedID} />}

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
            {t("discounts")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New discounts")}
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

export default DiscountsIndex;
