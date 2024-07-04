import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import ButtonLoader from "components/shared/ButtonLoader";
import { usePolicyCreate } from "../hooks/usePolicyCreate";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { TextFieldStyled } from "components/styled/TextField";
import EditorInput from "components/shared/EditorInput";

const PolicyCreate = () => {
  const {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    handleReset,
    loading,
    t,
    errors,
    details,
    control,
    setValue
  } = usePolicyCreate()

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create Terms}")}
      </Typography>
      <BoxStyled sx={{ px: "24px" }}>
        <Box component="form">
          <Grid container spacing={2}>
            {/* * //details */}
            {details.map((item, index) => (
              <Grid item key={index} xs={6} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px", }}>
                  <Typography variant="inputTitle" sx={{ color: 'text.main' }}>{item.head}</Typography>
                </Box>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={item.type}
                  placeholder={item.placeholder}
                  name={item.name}
                  {...register(item.register)}
                  error={errors[item.error]?.message}
                  helperText={errors[item.helperText]?.message || ""}
                />
              </Grid>
            ))}
            <Grid item xs={12} sx={{ p: "10px", }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="inputTitle" sx={{ color: 'text.main' }}>{t('message_en')}</Typography>
              </Box>
              <EditorInput control={control} register={register} name={'message_en'} setValue={setValue} errors={errors?.message_en?.message} />
            </Grid>
            <Grid item xs={12} sx={{ p: "10px", }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="inputTitle" sx={{ color: 'text.main' }}>{t('message_de')}</Typography>
              </Box>
              <EditorInput control={control} register={register} name={'message_de'} setValue={setValue} errors={errors?.message_de?.message} />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            mt: "20px",
            display: "flex",
            justifyContent: "flex-end",
            columnGap: "15px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "120px",
              borderColor: "origin.main",
              color: "primary.main",
              "&:hover": {
                borderColor: "origin.main",
              },
            }}
            onClick={handleCancel}
          >
            {t("Cancel")}
          </Button>
          <ButtonAction
            name={t("Reset")}
            onClick={handleReset}
            type="reset"
          />
          <ButtonLoader name={t("Submit")}
            onClick={() => handleSubmit(hanldeCreate)()}
            type="submit"
            loading={loading}
            disableOnLoading
          >
            {t("Submit")}
          </ButtonLoader>
        </Box>
      </BoxStyled>
    </Box>
  );
};

export default PolicyCreate;