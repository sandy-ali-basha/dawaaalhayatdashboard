
import {
  Typography,
  Box,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { BoxStyled } from "components/styled/BoxStyled";
import React from "react";
import { useNavigate } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import Loader from "components/shared/Loader";

import { useHeroimage } from "hooks/heroimage/useHeroimage";
import DeleteDialog from "../components/Dialog";
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';

const HeroimageIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, isLoading, count } = useHeroimage();
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
            {t("heroimage")}
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
            {t("New heroimage")}
          </Button>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={data?.hero_image?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
        </Box>

        <BoxStyled sx={{ p: 2 }}>
          {data?.hero_image?.image !== '' ?
            <img style={{ width: '100%', borderRadius: '10px' }} src={data?.hero_image?.image} alt="hero" /> :
            <Box sx={{ display: 'flex' }}>
              <ImageNotSupportedOutlinedIcon sx={{ color: 'text.main', fontSize: '7rem', margin: '20px auto' }} />
              <Typography sx={{ color: 'text.main', fontSize: '4rem', margin: '20px auto' }}>{t('No Hero Image !')}</Typography>
            </Box>
          }
        </BoxStyled>
      </Box>
    </>
  );
};

export default HeroimageIndex;
