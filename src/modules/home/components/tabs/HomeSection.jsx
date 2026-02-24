import React, { useCallback, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  CardMedia,
  Grid,
  Skeleton,
  Tooltip,
} from "@mui/material";
import HomeUpdate from "../HomeUpdate";
import { colorStore } from "store/ColorsStore";
import { AddHomeOutlined, Edit } from "@mui/icons-material";
import { useHomeSection } from "hooks/home/useHomeSection";
import { useNavigate } from "react-router-dom";
import DeleteItem from "../item/DeleteItem";
import ChangeStatus from "modules/home/pages/slider/ChangeStatus";

const HomeSection = ({ id }) => {
  const { data: section, isLoading } = useHomeSection(id);

  const [type, setType] = useState();
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const handleEdit = useCallback(
    (id, type) => {
      setEditedID(id);
      setType(type);
    },
    [setEditedID, setType],
  );
  const navigate = useNavigate();
  // 🔥 Loading Effect — Skeleton Cards
  if (isLoading) {
    return (
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {[...Array(6)].map((_, i) => (
          <Grid item xs={4} key={i}>
            <Card sx={{ mt: 3, borderRadius: 2, boxShadow: 2 }}>
              <Skeleton variant="rectangular" height={200} />
              <CardContent>
                {[...Array(3)].map((__, j) => (
                  <Box mb={2} key={j}>
                    <Skeleton width="50%" height={20} />
                    <Skeleton width="90%" height={18} />
                    <Skeleton width="30%" height={20} sx={{ mt: 1 }} />
                    <Skeleton width="80%" height={18} />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
  if (!section) return <Typography>Loading...</Typography>;
console.log("section",section)
  return (
    <>
      {editedID && (
        <HomeUpdate id={editedID} type={type} setHome_section_id={id} />
      )}

      <ChangeStatus id={id} type="section">
        {(section.active ?? section.active === 1) ? "Active" : "Not Active"}
      </ChangeStatus>

      <Typography variant="h6" sx={{ mt: 3, color: "black" }}>
        active: {section.active}
      </Typography>

      {id === 4 && (
        <>
          <Tooltip title="Add Reel">
            <IconButton
              variant="contained"
              onClick={() => navigate("create-item/4")}
            >
              <AddHomeOutlined sx={{ color: "warning.main", mr: 1 }} />
              Add Reel
            </IconButton>
          </Tooltip>
        </>
      )}
      <Grid container spacing={2}>
        {section?.items.map((item) => (
          <Grid item xs={4}>
            <Card key={item.id} sx={{ mt: 3, borderRadius: 2, boxShadow: 2 }}>
              <IconButton onClick={() => handleEdit(item?.id, "grid")}>
                <Edit />
              </IconButton>

              {id === 4 && (
                <IconButton>
                  <Tooltip title={"Delete"}>
                    <DeleteItem id={item?.id} count={1} page={1} />
                  </Tooltip>
                </IconButton>
              )}

              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={`grid-item-${item.id}`}
              />
              <CardContent>
                {["ar", "en", "kr"].map((lang) => (
                  <Box key={lang} mb={2}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {lang.toUpperCase()} Title:
                    </Typography>
                    <Typography variant="body2">
                      {item[`title_${lang}`] ?? "N/A"}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="bold" mt={1}>
                      {lang.toUpperCase()} Description:
                    </Typography>
                    <Typography variant="body2">
                      {item[`description_${lang}`] ?? "N/A"}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomeSection;
