import { React, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, DialogContent, DialogContentText } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextFieldStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import wallet from "./Wallet.png";
import { _Regions } from "api/regions/regions";
import { useProduct } from "hooks/product/useProduct";
const schema = yup.object().shape({
  price: yup.string().required("price is required"),
});

const UpdateRegionPrice = ({ id, open, setOpen, productName }) => {
  const { t } = useTranslation("index");
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const { refetch } = useProduct();

  const { mutate } = useMutation((data) => createPost(data));
  async function createPost(data) {
    _Regions
      .updateRegionPrice({
        editedID: id,
        formData: { price: data?.price, product_name: productName },
      })
      .catch((err) => {
        setLoading(false);
      })
      .then((res) => {
        if (res?.code === 200) {
          handleClose();
        }
        refetch();
        setLoading(false);
      });
  }

  const hanldeUpdate = (input) => {
    mutate(input);
    setLoading(true);
  };

  return (
    <>
      {loading && <Loader />}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "text.main" }}>Update Price</DialogTitle>

        <DialogContent>
          <Box sx={{ width: "50%", margin: "0 auto" }}>
            <img src={wallet} alt="" style={{ width: "100%" }} />
          </Box>
          <DialogContentText>
            Change all Products group in this region Price
          </DialogContentText>
          <TextFieldStyled
            sx={{ my: 1, mx: "auto" }}
            type={"number"}
            fullWidth
            placeholder={"price"}
            name={"price"}
            {...register("price")}
            errors={errors?.price?.message}
          />
        </DialogContent>

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

export default UpdateRegionPrice;
