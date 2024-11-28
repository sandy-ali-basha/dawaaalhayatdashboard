import { React, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { colorStore } from "store/ColorsStore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { _Regions } from "api/regions/regions";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import { _cities } from "api/cities/cities";
const schema = yup.object().shape({
  city: yup.array().required("pleas select cities"),
});

const RegionsLinkCities = ({ openLink, setopenLink }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const [selectedCities, setSelectedCities] = useState([]);
  const formOptions = { resolver: yupResolver(schema) };
  const { handleSubmit, formState, register } = useForm(formOptions);
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [cities, setCiteies] = useState([]);
  useMemo(() => {
    _cities.index().then((response) => {
      if (response.code === 200) {
        setCiteies(response.data);
      }
    });
  }, []);

  const handleClose = () => {
    setopenLink(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Regions
      .Link({
        editedID: editedID,
        formData: {
          cities: selectedCities,
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.code === 200) handleClose();
      });
  }

  const hanldeUpdate = (input) => {
    mutate(input);
    setLoading(true);
  };

  return (
    <>
      {loading && <Loader />}
      <Dialog open={openLink} onClose={handleClose} >
        <DialogTitle sx={{ color: "text.main" }}>
          Link Cities with Region
        </DialogTitle>
        {!!cities && (
          <>
            <FormControl   fullWidth>
              <Select
              sx={{ mx: 2 }}
                labelId="city-label"
                id="city"
                multiple
                name={"city"}
                {...register("city")}
                value={selectedCities}
                onChange={(e) => setSelectedCities(e.target.value)}
                renderValue={(selected) =>
                  selected
                    .map(
                      (cityId) =>
                        cities?.state?.find((city) => city.id === cityId)?.name
                    )
                    .join(", ")
                }
              >
                {cities?.state?.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    <Checkbox checked={selectedCities.indexOf(city.id) > -1} />
                    <ListItemText primary={city.name} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>{errors.city?.message}</FormHelperText>
            </FormControl>
          </>
        )}

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "text.main" }}>
            {t("Cancel")}
          </Button>
          {loading && <Loader />}

          <ButtonLoader
            name={t("Submit")}
            onClick={() => handleSubmit(hanldeUpdate)()}
            type="save"
            loading={loading}
            disableOnLoading
          >
            {t("Submit")}
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegionsLinkCities;
