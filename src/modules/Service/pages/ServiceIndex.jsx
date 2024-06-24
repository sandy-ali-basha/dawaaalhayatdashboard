
import {
  Typography,
  Box,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Button,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { BoxStyled } from "components/styled/BoxStyled";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import React, { useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useService } from "hooks/service/useService";
import ServiceUpdate from "./ServiceUpdate";
import DeleteDialog from "../components/Dialog";
import { Close, Delete, DesignServices, RestoreFromTrash, RestoreFromTrashOutlined } from "@mui/icons-material";
import RestoreUser from "../components/RestoreUser";

const ServiceIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count, query, setQuery } = useService();

  const [restore, setRestore] = useState(false)
  const [restoreId, setRestoreId] = useState(null)

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [
      t("image"),
      t("name"),
      t("price type"),
      t("operations"),
    ];
  }, [t]);

  const handleView = useCallback((id) => { navigate('view/' + id) }, [navigate])
  const handleEdit = useCallback((id) => { setEditedID(id) }, [setEditedID])

  const handleRestore = useCallback((id) => { setRestore(true); setRestoreId(id) }, [])

  const rows = useMemo(() => {
    return data?.services?.map((service, id) => (
      <TableRow sx={{ height: "65px" }} key={service.id} hover>
        <TableCell sx={{ minWidth: 50 }}><img style={{ width: '100px', height: '100px', objectFit: 'contain', borderRadius: '10px' }} src={service?.image ?? "Null"} alt='service' /></TableCell>
        <TableCell sx={{ minWidth: 50 }}>{service?.name ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>{service?.price_type ?? "Null"}</TableCell>
        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton onClick={() => handleEdit(service?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: 'text.main' }} />
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => navigate(`sub/${service?.id}`)} >
            <Tooltip title={"sub services"}>
              <DesignServices sx={{ color: 'text.main', cursor: 'pointer' }} />
            </Tooltip>
          </IconButton>

          {query ?
            <IconButton onClick={() => handleRestore(service?.id)}>
              <Tooltip title={direction === "ltr" ? "restore" : "استعادة"}>
                <RestoreFromTrashOutlined sx={{ color: 'text.main', cursor: 'pointer' }} />
              </Tooltip>
            </IconButton> :
            <IconButton>
              <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
                <DeleteDialog id={service?.id} count={count} page={page} />
              </Tooltip>
            </IconButton>
          }

          <IconButton onClick={() => handleView(service.id)}>
            <Tooltip title={direction === "ltr" ? "View" : "مشاهدة"}>
              <VisibilityTwoToneIcon color="primary" />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }, [data, count, direction, handleEdit, handleView, page, navigate, query, handleRestore]);

  const handleCreate = () => navigate("create")

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <ServiceUpdate id={editedID} />}
      <RestoreUser open={restore} setOpen={setRestore} id={restoreId} />

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
            {t("service")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            sx={{
              color: "primary.main",
              backgroundColor: "origin.main",
              "&:hover": { backgroundColor: "origin.main" },
            }}
            onClick={handleCreate}
          >
            {t("New service")}
          </Button>
        </Box>

        <BoxStyled sx={{ px: "10px" }}>
          <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
            <Checkbox onClick={(e) => { setQuery(e.target.checked) }} icon={<Delete />} checkedIcon={<Close />} />
            <Typography sx={{ color: 'text.main' }}>{query ? 'show data' : 'show trashed data'}</Typography>
          </Box>
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

export default ServiceIndex;
