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
  CardMedia,
} from "@mui/material";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { useTranslation } from "react-i18next";
import { settingsStore } from "store/settingsStore";
import { colorStore } from "store/ColorsStore";
import Loader from "components/shared/Loader";
import AboutusUpdate from "./AboutusUpdate";
import { useAboutus, usePartners } from "hooks/aboutus/useAboutus";
import EditImage from "modules/product/components/images/EditImage";
import { AddAPhoto } from "@mui/icons-material";
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
  const groupedAboutUs = data?.data?.reduce((acc, item) => {
    if (!acc[item.about_us_id]) {
      acc[item.about_us_id] = [];
    }
    acc[item.about_us_id].push(item);
    return acc;
  }, {});
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
          {groupedAboutUs &&
            Object.entries(groupedAboutUs).map(([aboutUsId, items]) => (
              <Grid item xs={12} md={6} lg={6}>
                <Box key={aboutUsId}>
                  {/* Section Title (مثلاً Welcome / Mission / Vision) */}
                  <Typography variant="h5" sx={{ mb: 3, color: "text.main" }}>
                    {items[0]?.section}
                  </Typography>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: 3,
                    }}
                  >
                    {items.map((aboutus, idx) => (
                      <Box key={aboutus.id}>
                        {idx === 0 && (
                          <>
                            <CardMedia
                              component="img"
                              height="140"
                              image={aboutus.image_url}
                              alt={aboutus.title}
                            />
                            <CardActions
                              sx={{ mt: "auto", justifyContent: "flex-end" }}
                            >
                              <IconButton
                                onClick={() => handleEdit(aboutus.about_us_id)}
                              >
                                <Tooltip
                                  title={direction === "ltr" ? "Edit" : "تعديل"}
                                >
                                  <ModeTwoToneIcon />
                                </Tooltip>
                              </IconButton>
                            </CardActions>
                          </>
                        )}
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {aboutus.title}
                          </Typography>

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
                      </Box>
                    ))}
                  </Card>
                </Box>
              </Grid>
            ))}
        </Grid>
        <Box sx={{ display: "flex", my: 2 }}>
          <Typography
            color="text.primary"
            variant="h5"
            sx={{ color: "text.main" }}
          >
            Partners
          </Typography>
          <IconButton href="aboutus/create">
            <Tooltip title={"add Partner"}>
              <AddAPhoto />
            </Tooltip>
          </IconButton>
        </Box>
        <EditImage
          open={open}
          setOpen={setOpen}
          link={"about/partners/" + partnerId}
          name={"logo_url"}
        />
        <Grid container spacing={3}>
          {partners?.data?.map((partner) => (
            <Grid item xs={12} md={6} lg={4} key={partner.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
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
