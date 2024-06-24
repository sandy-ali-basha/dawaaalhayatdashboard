import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ButtonCancle = ({ setResetForm, setValue, resetForm }) => {
  const { t } = useTranslation("index");

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          width: "120px",
          borderColor: "origin.main",
          color: "origin.main",
          "&:hover": {
            borderColor: "origin.main",
          },
        }}
        onClick={handleCancel}
      >
        {t("Cancel")}
      </Button>
    </div>
  );
};

export default ButtonCancle;
