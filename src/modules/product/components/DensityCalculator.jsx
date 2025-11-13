import { LineWeightRounded } from "@mui/icons-material";
import { Box, Typography, Grid } from "@mui/material";
import { TextFieldStyled } from "components/styled/TextField";

const DensityCalculator = ({ register, watch, errors, defaultData = {} }) => {
  const length = watch("length") || defaultData.length || "";
  const width = watch("width") || defaultData.width || "";
  const height = watch("height") || defaultData.height || "";
  const weight = watch("weight") || defaultData.weight || "";
  const division = watch("division") || defaultData.division || "";

  const density =
    length && width && height && weight
      ? (weight / ((length * width * height) / division)).toFixed(4)
      : "";

  return (
    <Grid item xs={12}>
      <Typography
        variant="body1"
        color="text.main"
        sx={{ fontWeight: "bold", p: "10px" }}
      >
        <LineWeightRounded sx={{ color: "error.light", mx: 1 }} />
        Weight & Dimensions
      </Typography>

      <Box sx={{ p: "10px" }}>
        <Box sx={{ margin: "0 0 8px 5px" }}>
          <Typography color="text.main" variant="body1">
            Weight (gr)
          </Typography>
        </Box>
        <TextFieldStyled
          sx={{ width: "100%" }}
          type="number"
          name="weight"
          defaultValue={defaultData.weight}
          {...register("weight")}
          error={!!errors["weight"]}
          helperText={errors["weight"]?.message || ""}
        />
      </Box>

      <Box
        sx={{
          backgroundColor: "secondary.lighter",
          borderRadius: 1,
          m: 1,
          p: 2,
        }}
      >
        <Grid container>
          <Grid item xs={6} sx={{ p: "10px" }}>
            <Box sx={{ margin: "0 0 8px 5px" }}>
              <Typography color="text.main" variant="body1">
                Length (cm)
              </Typography>
            </Box>
            <TextFieldStyled
              sx={{ width: "100%" }}
              type="number"
              name="length"
              defaultValue={defaultData.length}
              {...register("length")}
              error={!!errors["length"]}
              helperText={errors["length"]?.message || ""}
            />
          </Grid>

          <Grid item xs={6} sx={{ p: "10px" }}>
            <Box sx={{ margin: "0 0 8px 5px" }}>
              <Typography color="text.main" variant="body1">
                Width (cm)
              </Typography>
            </Box>
            <TextFieldStyled
              sx={{ width: "100%" }}
              type="number"
              name="width"
              defaultValue={defaultData.width}
              {...register("width")}
              error={!!errors["width"]}
              helperText={errors["width"]?.message || ""}
            />
          </Grid>

          <Grid item xs={6} sx={{ p: "10px" }}>
            <Box sx={{ margin: "0 0 8px 5px" }}>
              <Typography color="text.main" variant="body1">
                Height (cm)
              </Typography>
            </Box>
            <TextFieldStyled
              sx={{ width: "100%" }}
              type="number"
              name="height"
              defaultValue={defaultData.height}
              {...register("height")}
              error={!!errors["height"]}
              helperText={errors["height"]?.message || ""}
            />
          </Grid>

          <Grid item xs={6} sx={{ p: "10px" }}>
            <Box sx={{ margin: "0 0 8px 5px" }}>
              <Typography color="text.main" variant="body1">
                Division
              </Typography>
            </Box>
            <TextFieldStyled
              sx={{ width: "100%" }}
              type="number"
              name="division"
              defaultValue={defaultData.division}
              {...register("division")}
              error={!!errors["division"]}
              helperText={errors["division"]?.message || ""}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ margin: "0 0 8px 5px" }}>
              <Typography color="text.main" variant="h6">
                Density (g/cm³):
              </Typography>
              <Typography
                color="text.main"
                sx={{
                  mt: 1,
                  p: 1,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                }}
              >
                {density || "--"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default DensityCalculator;
