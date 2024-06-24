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
import { useTerms } from "hooks/terms/useTerms";

import DeleteDialog from "../components/Dialog";
import { MessageOutlined, TitleOutlined } from "@mui/icons-material";

const TermsIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, isLoading, count } = useTerms();

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
            {t("terms")}
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
            {t("New terms")}
          </Button>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={data?.term?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
        </Box>
        {data?.term?.id ?
          <BoxStyled sx={{ px: "10px" }}>
            <Box sx={{ display: 'flex', color: 'text.main', justifyContent: 'flex-start', py: '10px', alignItems: 'center' }}>
              <TitleOutlined />
              <Typography sx={{ px: '10px' }}>{t("Title de")}</Typography>
              <Typography sx={{ px: '10px' }}>{data?.term?.translations[0]?.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', color: 'text.main', justifyContent: 'flex-start', py: '10px', alignItems: 'center' }}>
              <MessageOutlined />
              <Typography sx={{ px: '10px' }}>{t("text ar")}</Typography>
              <Typography sx={{ px: '10px' }} dangerouslySetInnerHTML={{ __html: data?.term?.translations[0]?.text }}></Typography>
            </Box>
            <Box sx={{ display: 'flex', color: 'text.main', justifyContent: 'flex-start', py: '10px', alignItems: 'center' }}>
              <TitleOutlined />
              <Typography sx={{ px: '10px' }}>{t("text en")}</Typography>
              <Typography sx={{ px: '10px' }}>{data?.term?.translations[1]?.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', color: 'text.main', justifyContent: 'flex-start', py: '10px', alignItems: 'center' }}>
              <MessageOutlined />
              <Typography sx={{ px: '10px' }}>{t("text ar")}</Typography>
              <Typography sx={{ px: '10px' }} dangerouslySetInnerHTML={{ __html: data?.term?.translations[1]?.text }}></Typography>
            </Box>
            <Box sx={{ display: 'flex', color: 'text.main', justifyContent: 'flex-start', py: '10px', alignItems: 'center' }}>
              <TitleOutlined />
              <Typography sx={{ px: '10px' }}>{t("text kr")}</Typography>
              <Typography sx={{ px: '10px' }}>{data?.term?.translations[2]?.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', color: 'text.main', justifyContent: 'flex-start', py: '10px', alignItems: 'center' }}>
              <MessageOutlined />
              <Typography sx={{ px: '10px' }}>{t("text kr")}</Typography>
              <Typography sx={{ px: '10px' }} dangerouslySetInnerHTML={{ __html: data?.term?.translations[2]?.text }}></Typography>
            </Box>
          </BoxStyled> : <BoxStyled sx={{ color: 'text.main', textAlign: 'center', my: '10px' }}>{t("No Terms Added")}</BoxStyled>}
      </Box>
    </>
  );
};

export default TermsIndex;
