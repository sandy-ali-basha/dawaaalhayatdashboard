import {
  Typography,
  Box,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import AddIcon from "@mui/icons-material/Add";

import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { categoryStore } from "store/categoryStore";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import { useDebounce } from "hooks/useDebounce";
import { TextFieldStyled } from "components/styled/TextField";
import { useCallback } from "react";
import DeleteDialog from "../components/Dialog";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { useBlog } from "hooks/blogs/useBlog";
import BlogsUpdate from "./BlogsUpdate";

const BlogsIndex = () => {
  const navigate = useNavigate();
  const { direction } = settingsStore();
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, setQuery, count } = useBlog();
  const [editedID, setEditedID] = categoryStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return ["#", t("Title"), t("Content"), t("Operations")];
  }, [t]);
  const handleSearch = useDebounce((e) => {
    setQuery(e.target.value);
  }, 1000);

  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );
  const handleCreate = () => {
    navigate("create");
  };
  const handleView = useCallback(
    (id) => {
      navigate(`view/${id}`);
    },
    [navigate]
  );

  const rows = useMemo(() => {
    return data?.blogs?.map((blog) => (
      <TableRow sx={{ height: "65px" }} key={blog.id} hover>
        <TableCell sx={{ minWidth: 200 }}>{blog?.id}</TableCell>
        <TableCell sx={{ minWidth: 200 }}>{blog?.title}</TableCell>
        <TableCell sx={{ minWidth: 200 }}>
          <div
            dangerouslySetInnerHTML={{
              __html: blog?.content ?? "Null",
            }}
          />
        </TableCell>

        <TableCell
          align="center"
          sx={{
            minWidth: 200,
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={() => handleEdit(blog?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "white" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <Box>
                <DeleteDialog id={blog?.id} count={count} page={page} />
              </Box>
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => handleView(blog.id)}>
            <Tooltip title={direction === "ltr" ? "View" : "مشاهدة"}>
              <Box>
                <VisibilityTwoToneIcon color="primary" />
              </Box>
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }, [data, handleEdit, direction, count, page, handleView]);

  return (
    <>
      {editedID && <BlogsUpdate id={editedID} />}
      {isLoading && <Loader />}

      <Box
        sx={{
          width: { sl: "300px" },
          backgroundColor: { xs: "background.main" },
          ml: { xs: "0px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "25px",
          }}
        >
          <Typography sx={{ color: "text.main" }} variant="h5">
            {t("Blogs")}
          </Typography>

          <ButtonAction
            name={t("New Blog")}
            onClick={handleCreate}
            startIcon={<AddIcon />}
          />
        </Box>

        <BoxStyled sx={{ px: "10px" }}>
          <Box
            sx={{
              mb: "15px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextFieldStyled
              placeholder={t("Search")}
              onChange={handleSearch}
            />
          </Box>
          <Table
            columns={columns}
            rows={rows}
            page={page}
            setPage={setPage}
            count={Math.ceil(data?.pagination?.total / count) || 0}
          />
        </BoxStyled>
      </Box>
    </>
  );
};

export default BlogsIndex;
