import { useState } from "react";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  Button,
  Box,
  ButtonGroup,
  Chip,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import EditMultiLinksModal from "./EditMultiLinksModal";
import { useQuery } from "react-query";
import { _Home } from "api/home/home";


const MultiLinksBannersSection = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenChange = () => setIsEditModalOpen(!isEditModalOpen);

  const { data: multiLinksBanners } = useQuery({
    queryKey: ["multi-links-banners"],
    queryFn: () => _Home.getMultiLinksBanners(),
  });

  const defaultValues = multiLinksBanners ? multiLinksBanners[0] : null;

  if (!defaultValues) return <></>;

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" color="text.main">
              Multi Links Banner
            </Typography>
            {!defaultValues.is_active && (
              <Chip
                label="Inactive"
                color="error"
                variant="outlined"
                size="small"
                sx={{ mr: 1 }}
              />
            )}
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit
            </Button>
          </Box>

          <EditMultiLinksModal
            isOpen={isEditModalOpen}
            handleOpenChange={handleOpenChange}
            defaultValues={defaultValues}
          />

          {/* Image Display */}
          <Box
            sx={{
              width: "80%",
              height: "auto",
              aspectRatio: "20 / 9",
              position: "relative",
              borderRadius: "5px",
              overflow: "hidden",
              mt: 2,
              mx: "auto",
              filter: defaultValues.is_active ? "none" : "grayscale(0.6)",
              opacity: defaultValues.is_active ? 1 : 0.7,
            }}
          >
            {defaultValues.image && (
              <img
                key={defaultValues.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={defaultValues.image}
                alt={defaultValues.title}
              />
            )}

            {defaultValues.links && (
              <ButtonGroup
                size="small"
                sx={{
                  backgroundColor: defaultValues.button_color,
                  color: defaultValues.text_color,
                  borderRadius: "20px",
                  position: "absolute",
                  left: defaultValues.x ? `${defaultValues.x}%` : "15%",
                  top: defaultValues.y ? `${defaultValues.y}%` : "43%",
                }}
              >
                {defaultValues.links.map((link, i) => {
                  let borderRadius = "0";

                  if (i === 0) {
                    borderRadius = "20px 0 0 20px";
                  }
                  if (i === defaultValues.links.length - 1)
                    borderRadius = "0 20px 20px 0";

                  return (
                    <Button
                      key={link.name}
                      sx={{
                        borderRadius: borderRadius,
                        color: defaultValues.text_color,
                        borderColor: defaultValues.text_color,
                      }}
                    >
                      {link.name}
                    </Button>
                  );
                })}
              </ButtonGroup>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MultiLinksBannersSection;
