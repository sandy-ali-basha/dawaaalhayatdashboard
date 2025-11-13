import React from "react";
import { Box, IconButton, Tooltip, Stack } from "@mui/material";
import {
  Instagram,
  Facebook,
  LinkedIn,
  Email,
  Phone,
} from "@mui/icons-material";
import { BoxStyled } from "components/styled/BoxStyled";

const SocialMediaLinks = ({ data, direction = "ltr" }) => {
  const openLink = (url) => {
    if (url) window.open(url, "_blank");
  };

  const contactAction = (type, value) => {
    if (!value) return;
    if (type === "email") window.location.href = `mailto:${value}`;
    if (type === "phone") window.location.href = `tel:${value}`;
  };

  return (
    <BoxStyled
      sx={{
        gap: 2,
        p: 2,
      }}
    >
      <Stack direction="row" spacing={2}>
        <Tooltip title="Instagram">
          <IconButton
            color="primary"
            onClick={() => openLink(data?.instagram)}
            disabled={!data?.instagram}
          >
            {data?.instagram} <Instagram />
          </IconButton>
        </Tooltip>

        <Tooltip title="Facebook">
          <IconButton
            color="primary"
            onClick={() => openLink(data?.facebook)}
            disabled={!data?.facebook}
          >
            {data?.facebook} <Facebook />
          </IconButton>
        </Tooltip>

        <Tooltip title="LinkedIn">
          <IconButton
            color="primary"
            onClick={() => openLink(data?.linkedin)}
            disabled={!data?.linkedin}
          >
            {data?.linkedin}
            <LinkedIn />
          </IconButton>
        </Tooltip>

        <Tooltip title="Email">
          <IconButton
            color="primary"
            onClick={() => contactAction("email", data?.email)}
            disabled={!data?.email}
          >
            {data?.email}
            <Email />
          </IconButton>
        </Tooltip>

        <Tooltip title="Phone">
          <IconButton
            color="primary"
            onClick={() => contactAction("phone", data?.phone)}
            disabled={!data?.phone}
          >
            {data?.phone} <Phone />
          </IconButton>
        </Tooltip>
      </Stack>
    </BoxStyled>
  );
};

export default SocialMediaLinks;
