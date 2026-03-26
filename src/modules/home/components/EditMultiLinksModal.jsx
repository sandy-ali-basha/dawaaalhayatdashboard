import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  DialogTitle,
  Dialog,
  DialogContent,
  ButtonGroup,
  Tooltip,
} from "@mui/material";
import { Save, Cancel, Add, Delete } from "@mui/icons-material";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Image from "modules/brand/brand_pages/components/Image";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQueryClient } from "react-query";
import { _Home } from "api/home/home";
import ButtonLoader from "components/shared/ButtonLoader";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

// Yup Validation Schema
const linkSchema = yup.object().shape({
  name: yup.object().shape({
    en: yup.string().required("English name is required"),
    ar: yup.string().required("Arabic name is required"),
    kr: yup.string().required("Kurdish name is required"),
  }),
  url: yup.string().url("Must be a valid URL").required("URL is required"),
});

const schema = yup.object().shape({
  image: yup.mixed().required("Image is required"),
  links: yup
    .array()
    .of(linkSchema)
    .min(1, "At least one link is required")
    .required("Links are required"),
  text_color: yup
    .string()
    .matches(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color")
    .required("Text color is required"),
  button_color: yup
    .string()
    .matches(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color")
    .required("Button color is required"),
  x: yup
    .number()
    .required("X position is required when link is provided")
    .min(0, "X must be at least 0")
    .max(100, "X must be at most 100"),
  y: yup
    .number()
    .required("Y position is required when link is provided")
    .min(0, "Y must be at least 0")
    .max(100, "Y must be at most 100"),
});

const getTransformedLinks = (data) => {
  // If translations exist, use those
  if (data.translations?.links?.length > 0) {
    return data.translations.links.map((link) => ({
      name: {
        en: link.name.en || "",
        ar: link.name.ar || "",
        kr: link.name.kr || "",
      },
      url: link.url || "",
    }));
  }

  // Fallback to non-translated links if available
  if (data.links?.length > 0) {
    return data.links.map((link) => ({
      name: {
        en: link.name || "",
        ar: link.name || "",
        kr: link.name || "",
      },
      url: link.url || "",
    }));
  }

  // Default empty link if no links provided
  return [{ name: { en: "", ar: "", kr: "" }, url: "" }];
};

const EditMultiLinksModal = ({ isOpen, handleOpenChange, defaultValues }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      image: defaultValues.image,
      text_color: defaultValues.text_color || "#ffffff",
      button_color: defaultValues.button_color || "#000000",
      links: getTransformedLinks(defaultValues),
      x: defaultValues.x || 0,
      y: defaultValues.y || 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append image file
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    // Append other fields
    formData.append("text_color", data.text_color);
    formData.append("button_color", data.button_color);
    formData.append("x", data.x);
    formData.append("y", data.y);

    // Correct way to append array of objects
    data.links.forEach((link, index) => {
      formData.append(`links[${index}][url]`, link.url);
      formData.append(`links[${index}][name][en]`, link.name.en);
      formData.append(`links[${index}][name][ar]`, link.name.ar);
      formData.append(`links[${index}][name][kr]`, link.name.kr);
    });

    try {
      await _Home.updateMultiLinksBanners(formData);

      await queryClient.invalidateQueries({
        queryKey: ["multi-links-banners"],
      });
      handleOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleAddLink = () => {
    append({ name: { en: "", ar: "", kr: "" }, url: "" });
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination || !fields) return;

    const items = fields;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update form values with new order
    setValue("links", items);
  };

  return (
    <Dialog open={isOpen} onClose={handleCancel} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h5" sx={{ color: "color.main" }}>
          Edit Multi-Links Banner
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid item xs={12}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Image Upload */}
            <Image
              control={control}
              name="image"
              errors={errors?.image?.message}
              defaultImage={defaultValues.image}
              button={
                <ButtonGroup
                  size="small"
                  sx={{
                    backgroundColor: watch("button_color"),
                    color: watch("text_color"),
                    borderRadius: "20px",
                    position: "absolute",
                    left: `${watch("x")}%`,
                    top: `${watch("y")}%`,
                  }}
                >
                  {fields.map((link, i) => {
                    let borderRadius = "0";

                    if (i === 0) {
                      borderRadius = "20px 0 0 20px";
                    }
                    if (i === defaultValues.links.length - 1)
                      borderRadius = "0 20px 20px 0";

                    return (
                      <Button
                        key={link.id}
                        sx={{
                          borderRadius: borderRadius,
                          color: watch("text_color"),
                          borderColor: watch("text_color"),
                        }}
                      >
                        {link.name.en}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              }
            />

            {/* X, Y and Color Fields */}
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6} md={3}>
                <Controller
                  name="x"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      label="X"
                      error={!!errors.x}
                      helperText={errors.x?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <Controller
                  name="y"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      label="Y"
                      error={!!errors.y}
                      helperText={errors.y?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <Controller
                  name="text_color"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="color"
                      label="Text Color"
                      error={!!errors.text_color}
                      helperText={errors.text_color?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <Controller
                  name="button_color"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="color"
                      label="Button Color"
                      error={!!errors.button_color}
                      helperText={errors.button_color?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* Links Section with Drag and Drop */}
            <Box mt={4}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Links
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddLink}
                  sx={{ ml: 2 }}
                >
                  Add Link
                </Button>
              </Typography>

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="links">
                  {(provided) => (
                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                      {fields.map((field, index) => (
                        <Draggable
                          key={field.id}
                          draggableId={field.id}
                          index={index}
                        >
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              mb={2}
                              p={2}
                              border={1}
                              borderRadius={2}
                              borderColor="divider"
                              boxShadow="0px 4px 18px 0px rgba(15, 20, 34, 0.1)"
                              sx={{
                                backgroundColor: "background.paper",
                                "&:hover": {
                                  boxShadow:
                                    "0px 4px 18px 0px rgba(15, 20, 34, 0.2)",
                                },
                              }}
                            >
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                              >
                                <Tooltip title="Drag to reorder">
                                  <IconButton
                                    {...provided.dragHandleProps}
                                    sx={{
                                      cursor: "grab",
                                      "&:active": { cursor: "grabbing" },
                                    }}
                                  >
                                    <DragIndicatorIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Link">
                                  <IconButton
                                    onClick={() => remove(index)}
                                    color="error"
                                  >
                                    <Delete />
                                  </IconButton>
                                </Tooltip>
                              </Box>

                              <Grid container spacing={2}>
                                {["en", "ar", "kr"].map((lang) => (
                                  <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    key={`link-${index}-${lang}`}
                                  >
                                    <Controller
                                      name={`links.${index}.name.${lang}`}
                                      control={control}
                                      render={({ field }) => (
                                        <TextField
                                          {...field}
                                          fullWidth
                                          label={`Link Name (${lang.toUpperCase()})`}
                                          error={
                                            !!errors.links?.[index]?.name?.[
                                              lang
                                            ]
                                          }
                                          helperText={
                                            errors.links?.[index]?.name?.[lang]
                                              ?.message
                                          }
                                        />
                                      )}
                                    />
                                  </Grid>
                                ))}
                                <Grid item xs={12}>
                                  <Controller
                                    name={`links.${index}.url`}
                                    control={control}
                                    render={({ field }) => (
                                      <TextField
                                        {...field}
                                        fullWidth
                                        label="URL"
                                        error={!!errors.links?.[index]?.url}
                                        helperText={
                                          errors.links?.[index]?.url?.message
                                        }
                                      />
                                    )}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>

              {errors.links?.message && (
                <Typography color="error" variant="body2">
                  {errors.links.message}
                </Typography>
              )}
            </Box>

            <Box sx={{ mt: 3, gap: 2, display: "flex", justifyContent: "end" }}>
              <Button
                startIcon={<Cancel />}
                onClick={handleCancel}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
              <ButtonLoader
                startIcon={<Save />}
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || !isDirty}
                loading={isSubmitting}
              >
                Submit
              </ButtonLoader>
            </Box>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default EditMultiLinksModal;
