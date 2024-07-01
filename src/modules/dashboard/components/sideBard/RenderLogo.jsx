import { useTheme } from "@mui/material";
import React from "react";

import logoDark from "assets/images/logodark.png";
import logoLight from "assets/images/logolight.svg";

import { useTranslation } from "react-i18next";

const RenderLogo = () => {
  const theme = useTheme();
  const { t } = useTranslation("index");

  const isDarkEn = theme.palette.mode === "dark" && theme.direction !== "rtl";
  const isDarkAr = theme.palette.mode === "dark" && theme.direction === "rtl";
  const isLightAr = theme.palette.mode === "light" && theme.direction === "rtl";
  const isLightEn = theme.palette.mode === "light" && theme.direction !== "rtl";

  if (isDarkEn)
    return (
      <div
        style={{
          backgroundImage: `url(${logoDark})`,
          width: "100%",
          height: "100%",
          margin: "10px",
          backgroundPosition: "center",
          backgroundSize: "containe",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    );
  else if (isDarkAr)
    return (
      <div
        style={{
          backgroundImage: `url(${logoDark})`,
          width: "100%",
          height: "100%",
          margin: "10px",
          backgroundPosition: "center",
          backgroundSize: "containe",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    );
  else if (isLightAr)
    return (
      <div
        style={{
          backgroundImage: `url(${logoLight})`,
          width: "100%",
          height: "100%",
          margin: "10px",
          backgroundPosition: "center",
          backgroundSize: "containe",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    );
  else if (isLightEn)
    return (
      <div
        style={{
          backgroundImage: `url(${logoLight})`,
          width: "100%",
          height: "100%",
          margin: "10px",
          backgroundPosition: "center",
          backgroundSize: "containe",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    );

  return <>{t("Logo")}</>;
};

export default RenderLogo;
