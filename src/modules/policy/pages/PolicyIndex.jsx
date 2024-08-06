import React from "react";
import {
  Typography,
  Box,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BoxStyled } from "components/styled/BoxStyled";
import { useNavigate } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import Loader from "components/shared/Loader";
import DeleteDialog from "../components/Dialog";
import { MessageOutlined, TitleOutlined } from "@mui/icons-material";
import { usePolicy } from "hooks/policy/usePolicy";

const PolicyIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, isLoading, count } = usePolicy();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

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
            {t("privacys")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New privacy")}
          </Button>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={data?.privacy?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
        </Box>
        {data?.privacy?.id ?
          <BoxStyled sx={{ px: "10px" }}>
            <Box sx={{ display: 'flex', color: 'text.main', justifyContent: 'flex-start', py: '10px', alignItems: 'center' }}>
              <TitleOutlined />
              <Typography sx={{ px: '10px' }}>{t("Title de")}</Typography>
              <Typography sx={{ px: '10px' }}>{data?.privacy?.translations[0]?.title}</Typography>
            </Box>
            <Box sx={{ display: 'flex', color: 'text.main', justifyContent: 'flex-start', py: '10px', alignItems: 'center' }}>
              <MessageOutlined />
              <Typography sx={{ px: '10px' }}>{t("message de")}</Typography>
              <Typography sx={{ px: '10px' }} dangerouslySetInnerHTML={{ __html: data?.term?.translations[0]?.message }}></Typography>
            </Box>
            <Box sx={{ display: 'flex', color: 'text.main', justifyContent: 'flex-start', py: '10px', alignItems: 'center' }}>
              <TitleOutlined />
              <Typography sx={{ px: '10px' }}>{t("message en")}</Typography>
              <Typography sx={{ px: '10px' }}>{data?.privacy?.translations[1]?.title}</Typography>
            </Box>
            <Box sx={{ display: 'flex', color: 'text.main', justifyContent: 'flex-start', py: '10px', alignItems: 'center' }}>
              <MessageOutlined />
              <Typography sx={{ px: '10px' }}>{t("message de")}</Typography>
              <Typography sx={{ px: '10px' }} dangerouslySetInnerHTML={{ __html: data?.term?.translations[1]?.message }}></Typography>
            </Box>
          </BoxStyled> : <BoxStyled sx={{ color: 'text.main', textAlign: 'center', my: '10px' }}>No privacy Added</BoxStyled>}
      </Box>
    </>
  );
};

export default PolicyIndex;
