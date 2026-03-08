import React, { useMemo, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import AddIcon from "@mui/icons-material/Add";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useContactus } from "hooks/contactus/useContactus";
import { _Contactus } from "api/contactus/contactus";
import { TextFieldStyled } from "components/styled/TextField";
import ButtonLoader from "components/shared/ButtonLoader";
import ContactusUpdate from "./ContactusUpdate";

const emptyLocationState = {
  map_url: "",
  is_main: 0,
  en: { office_name: "", address: "" },
  ar: { office_name: "", address: "" },
  kr: { office_name: "", address: "" },
};

const ContactusIndex = () => {
  const { t } = useTranslation("index");
  const queryClient = useQueryClient();

  const { data, isLoading } = useContactus();
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [editedLocationId, setEditedLocationId] = useState(null);
  const [deletingLocationId, setDeletingLocationId] = useState(null);
  const [locationForm, setLocationForm] = useState(emptyLocationState);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const company = data?.data?.[0];

  const { data: locationsData, isLoading: isLoadingLocations } = useQuery(
    ["contact-locations"],
    () => _Contactus.locationsIndex(),
  );

  const locations = useMemo(() => locationsData?.data || [], [locationsData]);

  const createLocationMutation = useMutation(
    (payload) => _Contactus.locationsCreate(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["contact-locations"]);
        handleCloseLocationDialog();
      },
    },
  );

  const updateLocationMutation = useMutation(
    ({ id, payload }) => _Contactus.locationsUpdate({ id, data: payload }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["contact-locations"]);
        handleCloseLocationDialog();
      },
    },
  );

  const deleteLocationMutation = useMutation(
    (id) => _Contactus.locationsDelete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["contact-locations"]);
      },
      onSettled: () => {
        setDeletingLocationId(null);
      },
    },
  );

  const handleLocationValue = (field, value) => {
    setLocationForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationTranslationValue = (lang, field, value) => {
    setLocationForm((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  };

  const handleOpenCreateLocationDialog = () => {
    setEditedLocationId(null);
    setLocationForm(emptyLocationState);
    setLocationDialogOpen(true);
  };

  const handleOpenEditLocationDialog = (location) => {
    const fallbackOfficeName =
      location?.office_name || location?.en?.office_name || "";
    const fallbackAddress = location?.address || location?.en?.address || "";

    setEditedLocationId(location?.id);
    setLocationForm({
      map_url: location?.map_url || "",
      is_main: Number(location?.is_main) === 1 ? 1 : 0,
      en: {
        office_name: location?.en?.office_name || fallbackOfficeName,
        address: location?.en?.address || fallbackAddress,
      },
      ar: {
        office_name: location?.ar?.office_name || fallbackOfficeName,
        address: location?.ar?.address || fallbackAddress,
      },
      kr: {
        office_name: location?.kr?.office_name || fallbackOfficeName,
        address: location?.kr?.address || fallbackAddress,
      },
    });
    setLocationDialogOpen(true);
  };

  const handleCloseLocationDialog = () => {
    setLocationDialogOpen(false);
    setEditedLocationId(null);
    setLocationForm(emptyLocationState);
  };

  const handleSubmitLocation = () => {
    const payload = {
      map_url: locationForm.map_url,
      is_main: Number(locationForm.is_main) === 1 ? 1 : 0,
      en: {
        office_name: locationForm.en.office_name,
        address: locationForm.en.address,
      },
      ar: {
        office_name: locationForm.ar.office_name,
        address: locationForm.ar.address,
      },
      kr: {
        office_name: locationForm.kr.office_name,
        address: locationForm.kr.address,
      },
    };

    if (editedLocationId) {
      updateLocationMutation.mutate({ id: editedLocationId, payload });
      return;
    }

    createLocationMutation.mutate(payload);
  };

  const handleDeleteLocation = (id) => {
    setDeletingLocationId(id);
    deleteLocationMutation.mutate(id);
  };

  const isSubmittingLocation =
    createLocationMutation.isLoading || updateLocationMutation.isLoading;

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
                  <Typography variant="h6">{company.companyName}</Typography>

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
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">{t("Locations")}</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenCreateLocationDialog}
              >
                {t("Add Location")}
              </Button>
            </Stack>
          </Grid>

          {locations.map((loc, index) => (
            <React.Fragment key={loc.id}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="subtitle1">
                          <LanguageIcon fontSize="small" /> {loc.office_name}
                        </Typography>
                        <Stack direction="row" spacing={0.5}>
                          <IconButton
                            onClick={() => handleOpenEditLocationDialog(loc)}
                          >
                            <ModeTwoToneIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteLocation(loc.id)}
                            disabled={deletingLocationId === loc.id}
                          >
                            <DeleteOutlineTwoToneIcon />
                          </IconButton>
                        </Stack>
                      </Stack>

                      <Typography variant="body2" color="text.secondary">
                        {loc.address}
                      </Typography>

                      <Typography variant="caption" sx={{ color: "text.main" }}>
                        {loc.is_main ? "Main Office" : "Branch Office"}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              {(index + 1) % 3 === 0 && <Grid item xs={12}><hr /></Grid>}
            </React.Fragment>
          ))}
        </Grid>
      </Box>

      <Dialog
        open={locationDialogOpen}
        onClose={handleCloseLocationDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ color: "text.main" }}>
          {editedLocationId ? t("Edit Location") : t("Create Location")}
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.2 }}>
            <Grid item xs={12} md={8}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t("Map URL")}
              </Typography>
              <TextFieldStyled
                fullWidth
                value={locationForm.map_url}
                onChange={(e) => handleLocationValue("map_url", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t("Main Office")}
              </Typography>
              <TextFieldStyled
                fullWidth
                select
                SelectProps={{ native: true }}
                value={locationForm.is_main}
                onChange={(e) => handleLocationValue("is_main", e.target.value)}
              >
                <option value={0}>{t("No")}</option>
                <option value={1}>{t("Yes")}</option>
              </TextFieldStyled>
            </Grid>

            {["en", "ar", "kr"].map((lang) => (
              <React.Fragment key={lang}>
                <Grid item xs={12}>
                  <Divider sx={{ mt: 1 }} />
                  <Typography
                    variant="subtitle2"
                    sx={{ mt: 1, color: "text.main" }}
                  >
                    {lang.toUpperCase()}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {t("Office Name")}
                  </Typography>
                  <TextFieldStyled
                    fullWidth
                    value={locationForm[lang].office_name}
                    onChange={(e) =>
                      handleLocationTranslationValue(
                        lang,
                        "office_name",
                        e.target.value,
                      )
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {t("Address")}
                  </Typography>
                  <TextFieldStyled
                    fullWidth
                    value={locationForm[lang].address}
                    onChange={(e) =>
                      handleLocationTranslationValue(
                        lang,
                        "address",
                        e.target.value,
                      )
                    }
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseLocationDialog} color="inherit">
            {t("Cancel")}
          </Button>
          <ButtonLoader
            onClick={handleSubmitLocation}
            loading={isSubmittingLocation}
            disableOnLoading
          >
            {editedLocationId ? t("Save Changes") : t("Create")}
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContactusIndex;
