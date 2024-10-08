import {
  Typography,
  Box,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from "@mui/material";

import { BoxStyled } from "components/styled/BoxStyled";
import React, { useMemo, useCallback, useState } from "react";

import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { useCities } from "hooks/cities/useCities";
import CitiesUpdate from "./CitiesUpdate";
import { colorStore } from "store/ColorsStore";

const CitiesIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useCities();

  const [direction] = settingsStore((state) => [state.direction]);

  const [prev_shipping_price, setPrev_shipping_price] = useState(null);
  const columns = useMemo(() => {
    return [t("name"), t("value"), t("shipping_price"), t("operations")];
  }, [t]);
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const handleEdit = useCallback(
    (value, id) => {
      setPrev_shipping_price(value);
      setEditedID(id);
    },
    [setPrev_shipping_price, setEditedID]
  );

  const rows = useMemo(() => {
    return data?.data?.state?.map((cities, id) => (
      <TableRow sx={{ height: "65px" }} key={cities.id} hover>
        <TableCell sx={{ minWidth: 50 }}>{cities?.name ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>{cities?.value ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {cities?.shipping_price ?? "Null"}
        </TableCell>

        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton
            onClick={() => handleEdit(cities, cities?.id)}
          >
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }, [data, direction, handleEdit]);

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <CitiesUpdate prev_shipping_price={prev_shipping_price} />}

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
            {t("cities")}
          </Typography>
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

export default CitiesIndex;
