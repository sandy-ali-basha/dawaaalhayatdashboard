import {
  Typography,
  Box,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { BoxStyled } from "components/styled/BoxStyled";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import React, { useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import ChangeStatus from "../components/ChangeStatus";
import { useProduct_opt_val } from "hooks/product_opt_val/useProduct_opt_val";
import DeleteDialog from "../components/Dialog";
import { useQuery } from "react-query";
import { _axios } from "interceptor/http-config";

const Product_opt_valIndex = () => {
  const { t } = useTranslation("index");

  const params = useParams();
  const { data, page, setPage, isLoading, count } = useProduct_opt_val(
    params.id
  );

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [t("name"), t("status"), t("operations")];
  }, [t]);

  const handleView = useCallback(
    (id) => {
      navigate("view/" + id);
    },
    [navigate]
  );
  const rows = useMemo(() => {
    // return data?.data?.map((product_opt_val, id) => (
    //   <TableRow sx={{ height: "65px" }} key={product_opt_val.id}>
    //     <TableCell sx={{ minWidth: 50 }}>
    //       {product_opt_val?.name ?? "Null"}
    //     </TableCell>
    //     <TableCell
    //       align="center"
    //       sx={{
    //         minWidth: 200,
    //       }}
    //     >
    //       <IconButton>
    //         <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
    //           <DeleteDialog
    //             id={product_opt_val?.id}
    //             count={count}
    //             page={page}
    //           />
    //         </Tooltip>
    //       </IconButton>
    //       <IconButton onClick={() => handleView(product_opt_val.id)}>
    //         <Tooltip title={direction === "ltr" ? "View" : "مشاهدة"}>
    //           <VisibilityTwoToneIcon color="primary" />
    //         </Tooltip>
    //       </IconButton>
    //     </TableCell>
    //   </TableRow>
    // ));
  }, [data, count, direction, handleView, page, t]);

  const handleCreate = () => navigate("create");
  const { data: option_data, error } = useQuery(
    ["product_options", "id-" + params.id],
    async () => {
      return await _axios
        .get("/product_options/" + params.id, {
          headers: {
            translations: "yes",
          },
        })
        .then((res) => res?.data?.data);
    },
    {
      enabled: !!params.id, // Ensure the query only runs if params.id is not null
    }
  );
  console.log("option_data", option_data);
  return (
    <>
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
            product option values
          </Typography>
          <Box display="flex">
            <Typography sx={{ mx: 2 }} variant="body1" color="text.primary">
              Arabic :{option_data?.translations[0].name}
            </Typography>
            <Typography sx={{ mx: 2 }} variant="body1" color="text.primary">
              English :{option_data?.translations[1].name}
            </Typography>
            <Typography sx={{ mx: 2 }} variant="body1" color="text.primary">
              Kurdish :{option_data?.translations[2].name}
            </Typography>
          </Box>
          <Button
            startIcon={<AddIcon />}
            sx={{
              color: "primary.main",
              backgroundColor: "origin.main",
              "&:hover": { backgroundColor: "origin.main" },
            }}
            onClick={handleCreate}
          >
            new value
          </Button>
        </Box>

        <BoxStyled sx={{ px: "10px" }}>
          <Table
            columns={columns}
            rows={rows}
            page={page}
            setPage={setPage}
            count={Math.ceil(data?.pagination?.total / count)}
          />
        </BoxStyled>
      </Box>
    </>
  );
};

export default Product_opt_valIndex;
