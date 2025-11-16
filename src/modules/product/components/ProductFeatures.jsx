import { Typography } from "@mui/material";
import { useState } from "react";
import EditImage from "./images/EditImage";
import { BoxStyled } from "components/styled/BoxStyled";

const ProductFeatures = ({ id }) => {
  const [open, setOpen] = useState(false);

  return (
    <BoxStyled
      sx={{
        p: 2,
        opacity: id ? "100%" : "50%",
        pointerEvents: id ? "initial" : "none",
      }}
    >
      <Typography variant="body1" color="initial">
        product features{" "}
      </Typography>
      <EditImage
        open={open}
        setOpen={setOpen}
        link={`/products/${id}/images/products_features`}
        status={"add"}
        isProductCreate={true}
      />{" "}
    </BoxStyled>
  );
};

export default ProductFeatures;
