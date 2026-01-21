import React, { useCallback, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { useTranslation } from "react-i18next";
import { settingsStore } from "store/settingsStore";
import { colorStore } from "store/ColorsStore";
import Loader from "components/shared/Loader";
import AboutusUpdate from "./AboutusUpdate";
import { useAboutus, usePartners } from "hooks/aboutus/useAboutus";
import EditImage from "modules/product/components/images/EditImage";
const { REACT_APP_API_URL } = process.env;
  
const AboutusIndex = () => {
  const { t } = useTranslation("index");
  const [open, setOpen] = useState(false);
  const [partnerId, setPartnerId] = useState(false);
  const { data, isLoading } = useAboutus();
  const { data: partners, isLoading: partnerLoading } = usePartners();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const handleEdit = useCallback((id) => setEditedID(id), [setEditedID]);

  const handleUpdatePartner = useCallback(
    (id) => {
      setPartnerId(id);
      setOpen(true);
    },
    [setPartnerId],
  );

  return (
    <>
      {isLoading || (partnerLoading && <Loader />)}
      {editedID && <AboutusUpdate id={editedID} />}

      <Box>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            color="text.primary"
            variant="h5"
            sx={{ color: "text.main" }}
          >
            {t("aboutus")}
          </Typography>
        </Box>

        {/* Cards */}
        <Grid container spacing={3}>
          {data?.data?.map((aboutus) => (
            <Grid item xs={12} md={6} lg={4} key={aboutus.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Typography color="text.primary" variant="h6" gutterBottom>
                    {aboutus.title}
                  </Typography>

                  <Chip label={aboutus.section} size="small" sx={{ mb: 1 }} />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: aboutus.description,
                    }}
                  />
                </CardContent>

                <CardActions
                  sx={{
                    mt: "auto",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* Edit */}
                  <IconButton onClick={() => handleEdit(aboutus.about_us_id)}>
                    <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                      <ModeTwoToneIcon />
                    </Tooltip>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography
          color="text.primary"
          variant="h5"
          sx={{ color: "text.main" }}
        >
          Partners
        </Typography>
        <EditImage
          open={open}
          setOpen={setOpen}
          link={"about/partners/" + partnerId}
        />
        <Grid container spacing={3}>
          {partners?.data?.map((partner) => (
            <Grid item xs={12} md={6} lg={4} key={partner.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Typography color="text.primary" variant="h6" gutterBottom>
                    {partner.name}
                  </Typography>
                  <img
                    src={REACT_APP_API_URL + partner.logo_url}
                    alt={partner.name}
                    width={"40vw"}
                    height={"40vw"}
                  />
                </CardContent>

                <CardActions
                  sx={{
                    mt: "auto",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* Edit */}
                  <IconButton onClick={() => handleUpdatePartner(partner.id)}>
                    <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                      <ModeTwoToneIcon />
                    </Tooltip>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AboutusIndex;
