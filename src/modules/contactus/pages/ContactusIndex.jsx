import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useContactus } from "hooks/contactus/useContactus";
import ContactusUpdate from "./ContactusUpdate";

const ContactusIndex = () => {
  const { t } = useTranslation("index");

  const { data, isLoading } = useContactus();

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const company = data?.data?.[0];

  if (isLoading) return <Loader />;

  if (!company) {
    return <Typography>No contact data found</Typography>;
  }

  return (
    <>
      {editedID && <ContactusUpdate id={editedID} />}

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
          <Typography variant="h5" sx={{ color: "text.main" }}>
            {t("contactus")}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Company Card */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">
                    {company.companyName}
                  </Typography>

                  <IconButton onClick={() => setEditedID(company.id)}>
                    <ModeTwoToneIcon />
                  </IconButton>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={1}>
                  <Typography>
                    <EmailIcon fontSize="small" /> {company.email}
                  </Typography>

                  <Typography>
                    <WhatsAppIcon fontSize="small" /> {company.whatsapp}
                  </Typography>

                  <Typography>
                    <FacebookIcon fontSize="small" /> {company.facebook}
                  </Typography>

                  <Typography>
                    <InstagramIcon fontSize="small" /> {company.instagram}
                  </Typography>

                  <Typography>
                    <LinkedInIcon fontSize="small" /> {company.linkedin}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Locations Cards */}
          {company.locations?.map((loc) => (
            <Grid item xs={12} md={6} key={loc.id}>
              <Card variant="outlined">
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">
                      <LanguageIcon fontSize="small" /> {loc.office_name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {loc.address}
                    </Typography>

                    <Typography variant="caption">
                      Lang: {loc.locale}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ContactusIndex;
