import React, { useState } from "react";
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

const ProductCreate = () => {
  const [newProductId, setNewProductId] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [productData, setProductData] = useState(null);
  const [basicInfoSubmit, setBasicInfoSubmit] = useState(null); // 👈 store submit fn
const [variantsSubmit, setVariantsSubmit] = useState(null)

  const steps = ["Basic Info", "Variants", "Images", "Categories & Features"];
  const Navigate = useNavigate();

  const handleNext = () => {
    // Step 0 (Basic Info) should trigger form submit
    if (activeStep === 0 && basicInfoSubmit) {
      basicInfoSubmit();
      return; // prevent auto-step increment, wait until onNext runs
    }

     if (activeStep === 1 && variantsSubmit) {
    variantsSubmit();
    return;
  } 
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep === 1 && newProductId.length > 0) {
      return;
    }
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedCities([]);
    Navigate("/dashboard/product/view/" + newProductId);
  };

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
              setSelectedCities={setSelectedCities}
              setNewProductId={setNewProductId}
            />
            <BasicInfo
              onNext={(data) => {
                setProductData(data);
                setActiveStep(1); // move to next step after successful save
              }}
              setNewProductId={setNewProductId}
              setSubmitFunction={setBasicInfoSubmit} // 👈 pass setter here
            />
          </Grid>
        )}

        {activeStep === 1 && (
          <Grid item xs={12}>
            <BoxStyled sx={{ my: 2 }}>
              <VariantsRepeater
                productData={productData}
                newProductId={newProductId}
                selectedCities={selectedCities}
                  setSubmitFunction={setVariantsSubmit} // 👈 link it
        onNext={() => setActiveStep(2)} // move to next step on success
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
            </Grid>
          </Grid>
        )}
      </Grid>

      {/* Step Controls */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>

        {activeStep < steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={handleReset}>
            Finish & View
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductCreate;
