
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
import { useAboutus } from "hooks/aboutus/useAboutus";
import AboutusUpdate from "./AboutusUpdate";
import DeleteDialog from "../components/Dialog";

const AboutusIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useAboutus();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [
      t("first name"),
      t("status"),
      t("operations"),
    ];
  }, [t]);
  
  const handleView = useCallback((id) => { navigate('view/' + id) }, [navigate])
  const handleEdit = useCallback((id) => { setEditedID(id) }, [setEditedID])
  

  const rows = useMemo(() => {
    return data?.aboutus?.map((aboutus, id) => (
      <TableRow sx={{ height: "65px" }} key={aboutus.id} hover>
        <TableCell sx={{ minWidth: 50 }}>{aboutus?.first_name ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 120 }} align="center">
          <ChangeStatus
            id={aboutus.id}
            action={aboutus.status === "active" && "change-status"}
          >
            {aboutus.status === "Active" ? t("Active") : t("Not Active")}
          </ChangeStatus>
        </TableCell>
        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton onClick={() => handleEdit(aboutus?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={aboutus?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => handleView(aboutus.id)}>
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
      {editedID && <AboutusUpdate id={editedID} />}

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
            {t("aboutus")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New aboutus")}
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

export default AboutusIndex;
