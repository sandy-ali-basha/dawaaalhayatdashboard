import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ButtonReset = ({ setResetForm, setValue, resetForm }) => {
  const { t } = useTranslation("index");

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (resetForm) {
      setValue();
    }
  }, [resetForm,setValue]);
  const handleReset = () => {
    if (document.querySelector("form") === "") {
      return enqueueSnackbar("nothing to reset", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    } else {
      document.querySelector("form").reset();
      setResetForm(true);
    }
  };
  return (
    <div>
      <Button
        id="rest"
        variant="outlined"
        sx={{
          width: "120px",
          borderColor: "origin.main",
          color: "origin.main",
          "&:hover": {
            borderColor: "origin.main",
          },
        }}
        onClick={handleReset}
      >
        {t("Reset")}
      </Button>
    </div>
  );
};

export default ButtonReset;
