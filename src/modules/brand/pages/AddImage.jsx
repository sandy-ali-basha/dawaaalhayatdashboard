import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import { useMutation } from "react-query";
import { _Home } from "api/home/home";
import EditorInput from "components/shared/EditorInput";

const HomeUpdate = ({ open, setOpen }) => {
  const formOptions = { resolver: yupResolver(yup.object({})) }; // No required fields
  const { register, handleSubmit, control, setValue, formState } = useForm(formOptions);
  const { errors } = formState;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    _axios.get("/home").then((res) => {
      setData(res.data?.data);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Home
      .update({ formData: data })
      .catch(() => setLoading(false))
      .then(() => {
        setLoading(false);
        // handleClose();
      });
  }

  const hanldeUpdate = (input) => {
    mutate(input);
    setLoading(true);
  };

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
    // Add other sections as needed
  ];

  return (
    <>
      {loading && <Loader />}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Home Data</DialogTitle>
        {data && (
          <Grid container component="form">
            {sections.map((section, sectionIndex) =>
              section.fields.map((item, index) => {
                const initialValue = data?.[section.key]?.value?.[item.lang]?.[item.name];
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
          </Grid>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <ButtonLoader
            name="Submit"
            onClick={() => handleSubmit(hanldeUpdate)()}
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
