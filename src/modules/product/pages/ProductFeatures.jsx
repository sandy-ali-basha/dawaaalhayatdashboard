import { Typography } from "@mui/material";
import { useState } from "react";
import EditImage from "../components/images/EditImage";
import { BoxStyled } from "components/styled/BoxStyled";

const ProductFeatures = ({ id }) => {
  const [open, setOpen] = useState(false);

  return (
    <BoxStyled
      sx={{
        p: 2,
        opacity: id.length > 0 ? "100%" : "50%",
        pointerEvents: id.length > 0 ? "initial" : "none",
      }}
    >
      <Typography variant="body1" color="initial">
        product features{" "}
      </Typography>
      <EditImage
        open={open}
        setOpen={setOpen}
        link={id.map((item) => `/products/${item}/images/products_features`)}
        status={"add"}
        isProductCreate={true}
      />{" "}
    </BoxStyled>
  );
};

export default ProductFeatures;
