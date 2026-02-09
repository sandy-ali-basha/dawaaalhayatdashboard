import { Box, Typography } from "@mui/material";
import ButtonAction from "components/shared/ButtonAction";
import Loader from "components/shared/Loader";
import { _axios } from "interceptor/http-config";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const InventoryView = () => {
  const { t } = useTranslation("index");
  const [direction] = settingsStore((state) => [state.direction]);
  const params = useParams();
  const navigate = useNavigate();
  
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // Fetch Inventory
  const { data, isLoading } = useQuery(
    ["inventory", "id-" + params.id],
    async () => {
      const res = await _axios.get("/invintory/" + params.id);
      return res.data?.invintorys;
    }
  );

  // Detail item component
  const DetailItem = ({ label, value }) => (
    <Box sx={{ width: { xs: "100%", sm: "50%" }, mb: 1 }}>
      <Typography sx={{ fontWeight: 600 }}>{label}:</Typography>
      <Typography>{value}</Typography>
    </Box>
  );

  return (
    <>
      {isLoading && <Loader />}
      {!!data && (
        <div>
          {/* Inventory Header */}
          <Typography
            sx={{
              backgroundColor: "card.main",
              borderRadius: "5px",
              color: "primary.main",
              width: { xs: "100%", md: "40%" },
              mx: "auto",
              mt: 2,
              textTransform: "uppercase",
              p: "10px 20px",
              textAlign: "center",
            }}
            variant="h5"
          >
            {data?.name?.en}
          </Typography>

          {/* Inventory Details Card */}
          <Box
            sx={{
              backgroundColor: "card.main",
              borderRadius: "10px",
              padding: "20px",
              width: { xs: "100%", md: "80%" },
              mx: "auto",
              mt: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t("Inventory Details")}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <DetailItem label={t("City")} value={data.name} />
              <DetailItem
                label={t("Shipping Price")}
                value={`${data.shipping_price} ${data.currency?.code}`}
              />
              <DetailItem
                label={t("Products Count")}
                value={data.products_count}
              />
            </Box>
          </Box>

          {/* Products + Variants */}
          <Box sx={{ mt: 4, width: { xs: "100%", md: "90%" }, mx: "auto" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t("Products in Inventory")}
            </Typography>

            <Box
              sx={{ backgroundColor: "card.main", borderRadius: "10px", p: 2 }}
            >
              {data?.Products?.products.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    mb: 4,
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "20px",
                  }}
                >
                  {/* Product Title */}
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {product?.name?.en || "-"}
                  </Typography>

                  {/* Product + Variant Table */}
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
                        <th style={colStyle}>Image</th>
                        <th style={colStyle}>{t("Variant Options")}</th>
                        <th style={colStyle}>{t("Price")}</th>
                        <th style={colStyle}>{t("Compare Price")}</th>
                        <th style={colStyle}>{t("Inventory Qty")}</th>
                      </tr>
                    </thead>

                    <tbody>
                      {product.variants.map((variant) => (
                        <tr
                          key={variant.id}
                          style={{ borderBottom: "1px solid #eee" }}
                        >
                          <td style={tdStyle}>
                            <img
                              alt={""}
                              src={
                                product.images?.[0]?.image_path ??
                                "https://via.placeholder.com/60"
                              }
                              width={60}
                              height={60}
                              style={{ borderRadius: 8, objectFit: "cover" }}
                            />
                          </td>

                          <td style={tdStyle}>{variant.options?.join(", ")}</td>

                          <td style={tdStyle}>
                            {variant.price} {variant.currency?.code}
                          </td>

                          <td style={tdStyle}>
                            {variant.compare_price ? (
                              <del>{variant.compare_price}</del>
                            ) : (
                              "-"
                            )}
                          </td>

                          <td style={tdStyle}>{variant.inventory}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              ))}
            </Box>
          </Box>
        </div>
      )}

      {/* Back Button */}
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

// Simple minimal table style
const colStyle = {
  padding: "10px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
};

export default InventoryView;
