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
import React, { useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
// import ChangeStatus from "../components/ChangeStatus";
import { useRegions } from "hooks/regions/useRegions";
import RegionsUpdate from "./RegionsUpdate";
import DeleteDialog from "../components/Dialog";
import RegionsLinkCities from "./RegionsLinkCities";
import { LinkRounded } from "@mui/icons-material";

const RegionsIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useRegions();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);
  const [openLink, setopenLink] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return ["name", "cities", t("operations")];
  }, [t]);

  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
      setOpenEdit(true)
    },
    [setEditedID]
  );
  const handleLink = useCallback(
    (id) => {
      setopenLink(true);
      setEditedID(id);
    },
    [setEditedID]
  );
  const rows = useMemo(() => {
    return data?.data?.map((regions, id) => (
      <TableRow sx={{ height: "65px" }} key={regions.id} hover>
        <TableCell sx={{ minWidth: 50 }}>{regions?.name ?? "Null"}</TableCell>

        <TableCell
          sx={{ minWidth: 400, display: "flex", flexWrap: "wrap" }}
          align="center"
        >
          {regions?.cities?.map((item, idx) => (
            <Chip
              key={idx}
              label={item?.name}
              size="small"
              variant="outlined"
              sx={{ m: 0.2 }}
            ></Chip>
          ))}
        </TableCell>
        {/* <TableCell sx={{ minWidth: 120 }} align="center">
          <ChangeStatus
            id={regions.id}
            action={regions.status === "active" && "change-status"}
          >
            {regions.status === "Active" ? t("Active") : t("Not Active")}
          </ChangeStatus>
        </TableCell> */}
        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton onClick={() => handleEdit(regions?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => handleLink(regions?.id)}>
            <Tooltip title={"Link Cities"}>
              <LinkRounded sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={regions?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }, [data?.data, direction, count, page, handleEdit, handleLink]);

  const handleCreate = () => navigate("create");

  return (
    <>
      {isLoading && <Loader />}
      {openEdit && <RegionsUpdate />}
      {openLink && <RegionsLinkCities openLink={openLink} setopenLink={setopenLink}/>}

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
            {t("regions")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New regions")}
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

export default RegionsIndex;
