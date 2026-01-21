import VariantCard from "./VariantCard";

const { LocationCityOutlined } = require("@mui/icons-material");
const { Box, Typography, Grid } = require("@mui/material");

const CityVariantsBox = ({
  flavors,
  packings,
  city,
  variants = [],
  onChange,
  dirtyIds,
  setDirtyIds,
  flavorsIsLoading,
  packingsIsLoading,
}) => {
  return (
    <Box
      sx={{
        mb: 2,
        p: 1,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "secondary.light",
        backgroundColor: "secondary.lighter",
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        <LocationCityOutlined sx={{ mb: -0.5, mr: 0.5 }} />
        {city}
      </Typography>

      <Grid container spacing={1}>
        {variants?.map((variant) => (
          <Grid item xs={12} key={variant.id}>
            <VariantCard
              variant={variant}
              onChange={onChange}
              flavors={flavors}
              packings={packings}
              dirtyIds={dirtyIds}
              setDirtyIds={setDirtyIds}
              flavorsIsLoading={flavorsIsLoading}
              packingsIsLoading={packingsIsLoading}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CityVariantsBox;
