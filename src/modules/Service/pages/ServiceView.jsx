
import { Box, Card, Typography } from "@mui/material";
import ButtonAction from "components/shared/ButtonAction";
import Loader from "components/shared/Loader";
import { _axios } from "interceptor/http-config";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
const ServiceView = () => {
  const { t } = useTranslation("index");
  const [direction] = settingsStore((state) => [state.direction]);
  const params = useParams();
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  const { data, isLoading } = useQuery(
    ["service", 'id-' + params.id],
    async () => {
      return await _axios
        .get('/admin/service/' + params.id)
        .then((res) => res.data?.services);
    },
    {}
  )
  return (
    <>
      {isLoading && <Loader />}
      {!!data && (
        <div>
          <Typography
            sx={{
              backgroundColor: "card.main",
              borderRadius: "5px",
              color: 'primary.main',
              width: "40%",
              marginInline: 'auto',
              height: "100%",
              textTransform: "uppercase",
              padding: '10px 20px',
              textAlign: 'center'
            }}
            variant="h5"
          >
            {data.name}
          </Typography>
        </div>
      )}
      <Card sx={{
        background: "card.main",
        margin: '10px',
        display: 'flex'
      }}
      >
        <img src={data?.image} alt="" style={{ borderRadius: '10px', margin: '10px', width: '30vw' }} />
        <div>
          <Typography sx={{ color: 'text.main', margin: '20px' }}>price type: {data?.price_type}</Typography>
          <Typography sx={{ color: 'text.main', margin: '20px' }}>name de: {data?.trasnaltions[0]?.name}</Typography>
          <Typography sx={{ color: 'text.main', margin: '20px' }}>name en: {data?.trasnaltions[1]?.name}</Typography>
        </div>
      </Card >
      <div
        style={{
          minWidth: "200px",
          float: direction === "ltr" ? "right" : "left",
          marginTop: "20px",
        }}
      >
        <ButtonAction
          name={t("Back")}
          onClick={handleBack}
          endIcon={direction === "ltr" ? <ArrowForward /> : <ArrowBack />}
        />
      </div>
    </>
  );
};

export default ServiceView;
