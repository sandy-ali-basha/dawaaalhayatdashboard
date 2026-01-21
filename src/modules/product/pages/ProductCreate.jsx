import React, { useCallback, useEffect, useState } from "react";
import AddImages from "./steps/AddImages";
import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import ProductAttr from "./ProductAttr";
import ProductFeatures from "../components/ProductFeatures";
import VariantsRepeater from "../components/VariantsRepeater";
import { BoxStyled } from "components/styled/BoxStyled";
import { Create } from "@mui/icons-material";
import BasicInfo from "./steps/BasicInfo";
import AddImagesSlider from "./steps/AddImagesSlider";
import PricesAndCountries from "./steps/Prices&Countries";
import { useNavigate } from "react-router-dom";
import { ProductStore, StepsStore } from "store/productStore";
import ProductdetailsCreate from "../ProductDetails/pages/ProductdetailsCreate";

const ProductCreate = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [basicInfoSubmit, setBasicInfoSubmit] = useState(null); // 👈 store submit fn
  const [variantsSubmit, setVariantsSubmit] = useState(null);
  const newProductId = ProductStore((state) => state.newProductId);
  const [activeStep, setActiveStep] = StepsStore((state) => [
    state.activeStep,
    state.setActiveStep,
  ]);
  const setBasicInfoStore = ProductStore((s) => s.setBasicInfo);
  const setCitiesStore = ProductStore((s) => s.setSelectedCities);

  const steps = ["Basic Info", "Variants", "Images", "Categories & Features"];
  const Navigate = useNavigate();

  useEffect(() => {
    setActiveStep(0);
  }, [setActiveStep]);

  const handleNext = useCallback(() => {
    if (activeStep === 0 && basicInfoSubmit) {
      basicInfoSubmit();
      return;
    }

    if (activeStep === 1 && variantsSubmit) {
      variantsSubmit();
      return;
    }

    setActiveStep(activeStep + 1);
  }, [activeStep, basicInfoSubmit, setActiveStep, variantsSubmit]);

  const handleBack = useCallback(() => {
    if (activeStep === 1 && newProductId) {
      return;
    }
    if (newProductId) return;
    setActiveStep(activeStep - 1);
  }, [activeStep, newProductId, setActiveStep]);

  const handleReset = useCallback(() => {
    setActiveStep(0);
    setSelectedCities([]);
    Navigate("/dashboard/product/view/" + newProductId);
  }, [Navigate, newProductId, setActiveStep]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        <Create color="info.main" /> Create New Product
      </Typography>

      {/* Stepper Header */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Grid container spacing={3}>
        {activeStep === 0 && (
          <Grid item xs={12}>
            <PricesAndCountries
              selectedCities={selectedCities}
              setSelectedCities={(cities) => {
                setSelectedCities(cities);
                setCitiesStore(cities); // 👈 تخزين
              }}
            />
            <BasicInfo
              onNext={(data) => {
                setBasicInfoStore(data); // 👈 تخزين
                setActiveStep(1);
              }}
              setSubmitFunction={setBasicInfoSubmit}
            />
          </Grid>
        )}

        {activeStep === 1 && (
          <Grid item xs={12}>
            <BoxStyled sx={{ my: 2 }}>
              <VariantsRepeater
                selectedCities={selectedCities}
                setSubmitFunction={setVariantsSubmit} // 👈 link it
              />
            </BoxStyled>
          </Grid>
        )}

        {activeStep === 2 && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AddImages id={newProductId} notDialog={true} />
              </Grid>
              <Grid item xs={6}>
                <AddImagesSlider id={newProductId} notDialog={true} />
              </Grid>
            </Grid>
          </Grid>
        )}

        {activeStep === 3 && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ProductAttr id={newProductId} notDialog={true} />
              </Grid>
              <Grid item xs={6}>
                <ProductFeatures id={newProductId} />
              </Grid>
              <Grid item xs={12}>
                <ProductdetailsCreate
                  id={newProductId}
                  isCreateProduct={true}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>

      {/* Step Controls */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          disabled={activeStep === 0}
          onClick={() => handleBack()}
          variant="outlined"
        >
          Back
        </Button>

        {activeStep < steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNext()}
          >
         Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleReset()}
          >
            Finish & View
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductCreate;
