
import {
  Typography,
  Box,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { BoxStyled } from "components/styled/BoxStyled";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import React, { useMemo,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import ChangeStatus from "../components/ChangeStatus";
import { useCareers } from "hooks/careers/useCareers";
import CareersUpdate from "./CareersUpdate";
import DeleteDialog from "../components/Dialog";

const CareersIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useCareers();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [
      t("id"),
      t("requisition no"),
      t("name"),
      t("time"),
      t("location"),
      t("country"),
      t("edit"),
    ];
  }, [t]);
  
  const handleView = useCallback((id) => { navigate('view/' + id) }, [navigate])
  const handleEdit = useCallback((id) => { setEditedID(id) }, [setEditedID])
  

  const rows = useMemo(() => {
    return data?.data?.careers?.map((careers, id) => (
      <TableRow sx={{ height: "65px" }} key={careers.id} hover>
        <TableCell sx={{ minWidth: 50 }}>{careers?.id ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>{careers?.requisition_no ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>{careers?.vacancy_name ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>{careers?.time_type ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>{careers?.location ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>{careers?.country ?? "Null"}</TableCell>
        {/* <TableCell sx={{ minWidth: 120 }} align="center">
          <ChangeStatus
            id={careers.id}
            action={careers.status === "active" && "change-status"}
          >
            {careers.status === "Active" ? t("Active") : t("Not Active")}
          </ChangeStatus>
        </TableCell> */}
        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton onClick={() => handleEdit(careers?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={careers?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => handleView(careers.id)}>
            <Tooltip title={direction === "ltr" ? "View" : "مشاهدة"}>
              <VisibilityTwoToneIcon color="primary" />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  },[data, count, direction, handleEdit, handleView, page,t]);

  const handleCreate = () => navigate("create")

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <CareersUpdate id={editedID} />}

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
            {t("careers")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New careers")}
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

export default CareersIndex;
