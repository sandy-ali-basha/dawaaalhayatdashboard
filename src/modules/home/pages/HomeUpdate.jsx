import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import EditorInput from "components/shared/EditorInput"; // Assuming this is the correct import for text editor
import { useMutation } from "react-query";
import { _Home } from "api/home/home";

const HomeUpdate = ({ open, setOpen }) => {
  const { register, handleSubmit, control, setValue, formState } = useForm({ resolver: yupResolver({}) });
  const { errors } = formState;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    _axios.get("/home/settings").then((res) => {
      setData(res.data?.data); // Fetching home data
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation((formData) => updateHomeData(formData));

  const updateHomeData = async (formData) => {
    setLoading(true);
    _Home.update({ formData })
      .catch(() => setLoading(false))
      .then(() => {
        setLoading(false);
        setOpen(false); // Close the modal after successful update
      });
  };

  const handleUpdate = (input) => {
    mutate(input);
    setLoading(true);
  };

  // Mapping form sections dynamically, including both text and language-specific fields
  const sections = [
    {
      key: 'home.page.stats',
      fields: [
        { lang: 'ar', name: 'title1', placeholder: 'Arabic Title 1' },
        { lang: 'en', name: 'title1', placeholder: 'English Title 1' },
        { lang: 'kr', name: 'title1', placeholder: 'Kurdish Title 1' },
        { lang: 'ar', name: 'subtitle1', placeholder: 'Arabic Subtitle 1' },
        { lang: 'en', name: 'subtitle1', placeholder: 'English Subtitle 1' },
        { lang: 'kr', name: 'subtitle1', placeholder: 'Kurdish Subtitle 1' },
      ],
    },
    {
      key: 'home.page.cta',
      fields: [
        { lang: 'ar', name: 'title', placeholder: 'Arabic CTA Title' },
        { lang: 'en', name: 'title', placeholder: 'English CTA Title' },
        { lang: 'kr', name: 'title', placeholder: 'Kurdish CTA Title' },
        { lang: 'ar', name: 'subtitle', placeholder: 'Arabic CTA Subtitle' },
        { lang: 'en', name: 'subtitle', placeholder: 'English CTA Subtitle' },
        { lang: 'kr', name: 'subtitle', placeholder: 'Kurdish CTA Subtitle' },
      ],
    },
    {
      key: 'home.page.textSectionOne',
      fields: [
        { lang: 'ar', name: 'text', placeholder: 'Arabic Text Section One' },
        { lang: 'en', name: 'text', placeholder: 'English Text Section One' },
        { lang: 'kr', name: 'text', placeholder: 'Kurdish Text Section One' },
      ],
    },
    {
      key: 'home.page.textSectionTwo',
      fields: [
        { lang: 'ar', name: 'text', placeholder: 'Arabic Text Section Two' },
        { lang: 'en', name: 'text', placeholder: 'English Text Section Two' },
        { lang: 'kr', name: 'text', placeholder: 'Kurdish Text Section Two' },
      ],
    },
    {
      key: 'home.page.videoText',
      fields: [
        { lang: 'ar', name: 'value', placeholder: 'Arabic Video Text' },
        { lang: 'en', name: 'value', placeholder: 'English Video Text' },
        { lang: 'kr', name: 'value', placeholder: 'Kurdish Video Text' },
      ],
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Home Data</DialogTitle>
        {data ? (
          <Grid container component="form">
            {sections.map((section, sectionIndex) =>
              section.fields.map((item, index) => {
                const sectionValue = data?.[section.key]?.value;
                const initialValue = sectionValue?.[item.lang]?.[item.name] || ""; // Ensure value exists
                const error = errors?.[item.name];

                return (
                  <Grid key={sectionIndex + "-" + index} item md={6} sx={{ p: "10px" }}>
                    <Box sx={{ margin: "0 0 8px 5px" }}>
                      <Typography variant="body1">{item.placeholder}</Typography>
                    </Box>
                    <EditorInput
                      control={control}
                      register={register}
                      name={`${section.key}.${item.lang}.${item.name}`}
                      setValue={setValue}
                      errors={error?.message || ""}
                      initialValue={initialValue}
                    />
                  </Grid>
                );
              })
            )}

            {/* Link field handling for CTA */}
            {data?.['home.page.cta']?.value?.link && (
              <Grid item xs={12} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="body1">CTA Link</Typography>
                </Box>
                <EditorInput
                  control={control}
                  register={register}
                  name="home.page.cta.value.link"
                  setValue={setValue}
                  errors={errors?.['home.page.cta']?.value?.link || ""}
                  initialValue={data['home.page.cta'].value.link}
                />
              </Grid>
            )}
          </Grid>
        ) : (
          <Typography>Loading data...</Typography>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <ButtonLoader
            name="Submit"
            onClick={() => handleSubmit(handleUpdate)()}
            type="save"
            loading={loading}
            disableOnLoading
          >
            Submit
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HomeUpdate;
