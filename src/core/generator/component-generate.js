const fs = require("fs");
const path = require("path");
const getFileName = require("./file-name.utiles");

const args = process.argv.slice(2);

if (args.length < 1) {
  throw new Error("Must Provide Component Name");
}

const componentName = args[0];
const fileName = getFileName(componentName);
const ComponentName = fileName.charAt(0).toUpperCase() + fileName.slice(1);

// const dirPath = args.length > 1 ? args[1] : process.env.INIT_CWD;
const dirPath = path.join(
  args.length > 1 ? args[1] : process.env.INIT_CWD,
  "src/modules"
);
const apidirPath = path.join(
  args.length > 1 ? args[1] : process.env.INIT_CWD,
  "src/api"
);
const HooksdirPath = path.join(
  args.length > 1 ? args[1] : process.env.INIT_CWD,
  "src/hooks"
);

fs.lstatSync(dirPath).isDirectory();
fs.mkdirSync(path.join(dirPath, componentName));
fs.mkdirSync(path.join(apidirPath, fileName));
fs.mkdirSync(path.join(HooksdirPath, fileName));

const tsContent = `
import React from "react";
import { Route, Routes } from "react-router-dom";
import ${ComponentName}Component from "./${ComponentName}Component";
import ${ComponentName}Index from "./pages/${ComponentName}Index";
import ${ComponentName}Update from "./pages/${ComponentName}Update";
import ${ComponentName}View from "./pages/${ComponentName}View";
import ${ComponentName}Create from "./pages/${ComponentName}Create";

const ${ComponentName}Routing = () => {
  return (
    <Routes>
      <Route element={<${ComponentName}Component />}>
        <Route path="/" element={<${ComponentName}Index />} />
        <Route path="/update/:id" element={<${ComponentName}Update />} />
        <Route path="/view/:id" element={<${ComponentName}View />} />
        <Route path="/create" element={<${ComponentName}Create />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default ${ComponentName}Routing;
`;
const component = `import React from "react";
import { Outlet } from "react-router-dom";
const ${fileName}Component = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default ${fileName}Component
`;
const changeStatus = `
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";
  import Loader from "components/shared/Loader";
  import React, { useState } from "react";
  import { useTranslation } from "react-i18next";
  import { useChangeStatus } from "../hooks/useChangeStatus";
  import { use${ComponentName} } from "hooks/${fileName}/use${ComponentName}";
  const ChangeStatus = ({ id, children, action }) => {
    const { t } = useTranslation("index")
    const { refetch } = use${ComponentName}()
    const changeStatus = useChangeStatus({ id: id, is_blocked: action });
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (e) => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleToggleChangeStatus = () => {
      setLoading(true);
      changeStatus.mutate({}, {
        onSuccess: () => {
          setOpen(false);
          setLoading(false);
          refetch();
        },
      }
      );
    };
  
    return (
      <>
        <Button onClick={handleClickOpen}>{children}</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "&.MuiDialog-container": {
              backgroundColor: "error.main",
            },
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ color: "primary.main", textTransform: "capitalize" }}
          >
            {t('change item status')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ color: "primary.main" }}
            >
              {t("Are you Sure you want to")}{" "}
              {t('change item status')}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t("Disagree")}</Button>
            {loading && <Loader />}
            <Button
              autoFocus
              variant="contained"
              onClick={handleToggleChangeStatus}
            >
              {t("Agree")}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
  
  export default ChangeStatus;
  `;
const dialog = `
  import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Loader from "components/shared/Loader";
import { Tooltip } from "@mui/material";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { useDelete${ComponentName} } from "hooks/${fileName}/useDelete${ComponentName}";
import { use${ComponentName} } from "hooks/${fileName}/use${ComponentName}";
const DeleteDialog = ({ id, page, count }) => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const delete${fileName} = useDelete${ComponentName}({ page, count });
  const handleClickOpen = (e) => setOpen(true)
  const handleClose = () => setOpen(false)
  const { refetch } = use${ComponentName}();
  const Delete${ComponentName} = () => {
    setLoading(true);
    delete${fileName}.mutate(id, {
      onSuccess: () => {
        setOpen(false);
        refetch()
      },
    });
  }
  const { direction } = settingsStore();
  return (
    <React.Fragment>
      <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
        <DeleteTwoToneIcon
          sx={{ color: "error.main" }}
          onClick={handleClickOpen}
        />
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-container": {
            backgroundColor: "error.main",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "primary.main" }}>
          {t("Delete Item")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "primary.main" }}
          >
            {t("Are you Sure you want to Delete it ?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('Disagree')}</Button>
          {loading && <Loader />}
          <Button autoFocus sx={{}} variant="contained" onClick={Delete${ComponentName}}>
            {t("Agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteDialog;
`;
const useChangStatus = `import { _axios } from "interceptor/http-config";
import { useQueryClient, useMutation } from "react-query";
export const useChangeStatus = ({ status, id }) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => _axios.get('/${fileName}/change-status/'+ id),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(["${fileName}", true, 1, 10]);
        const previousData = queryClient.getQueriesData([
          "${fileName}",
          true,
          1,
          10,
        ]);
        queryClient.setQueryData(
          ["${fileName}", true, 1, 10],
          (oldQueryData) => {
            const oldQueryDataCopy = oldQueryData?.${fileName}s?.filter(
              (old) => +old.id !== +id
            )[0];
            const queryUpdated = oldQueryData?.${fileName}s?.filter(
              (old) => +old.id === +id
            )[0];

            return [
              { ...oldQueryDataCopy },
              {
                ...queryUpdated,
                status: status === "active" && "change-status",
              },
            ];
          }
        );
        return {
          previousData,
        };
      },
      onSuccess: () => {
        return queryClient.invalidateQueries(["${fileName}", true, 1, 10]);
      },
      onError: (_error, _hero, context) => {
        queryClient.setQueryData(
          ["${fileName}", true, 1, 10],
          context.prevuiosQuery
        );
      },
    }
  );
};
`;
const useCreate = `
import { useEffect, useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _${ComponentName} } from "api/${fileName}/${fileName}";

const schema = yup.object().shape({
  kr: yup.object().shape({
    name: yup.string().required("Kurdish name is required"),
  }),
  ar: yup.object().shape({
    name: yup.string().required("Arabic name is required"),
  }),
  en: yup.object().shape({
    name: yup.string().required("English name is required"),
  }),
});

export const use${ComponentName}Create = () => {
  const { t } = useTranslation("index")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } = useForm(formOptions)
  const { errors } = formState
  const { mutate } = useMutation((data) => createPost(data))

  async function createPost(data) {
    _${ComponentName}
      .post(data, setLoading)
      .then(res => {
        if (res.success) navigate(-1)
        setLoading(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleCancel = () => navigate(-1)

  const handleReset = () => {
    const form = document.querySelector('form');
    if (form) form.reset()
  }

  const hanldeCreate = (input) => {
    const formData = new FormData()
    const inputWithoutBirthday = { ...input };
    delete inputWithoutBirthday.birthday;
    for (const [key, value] of Object.entries(inputWithoutBirthday)) {
      formData.append(key, value);
    }
    mutate(formData);
    setLoading(true);
  }

  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "en", name: "English" },
    { code: "kr", name: "Kurdish" },
  ];

  const details = languages.map((lang, index) => ({
    head: t("name " + lang.name.toLowerCase()),
    type: "text",
    placeholder: t("name"),
    register: lang.code + ".name",
  }));

  return {
    handleCancel,
    handleReset,
    hanldeCreate,
    register,
    handleSubmit,
    setValue,
    loading,
    t,
    errors,
    details,
    control,
  };
};

`;
const create = `import { Typography, Box, Button, Grid } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React from "react";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import { use${ComponentName}Create } from "../hooks/use${ComponentName}Create";
import ButtonLoader from "components/shared/ButtonLoader";
const ${ComponentName}Create = () => {
  const {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    handleReset,
    loading,
    t,
    errors,
    details,
  } = use${ComponentName}Create()


  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create ${ComponentName}}")}
      </Typography>
      <BoxStyled sx={{ px: "24px" }}>
        <Box component="form">
          <Grid  container spacing={2}>
            {/* * //details */}
            {details.map((item, index) => (
              <Grid item key={index} xs={6} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="body1">{item.head}</Typography>
                </Box>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={item.type}
                  placeholder={item.placeholder}
                  name={item.name}
                  {...register(item.register)}
                  error={errors[item.error]?.message}
                  helperText={errors[item.helperText]?.message || ""}
                />
              </Grid>
            ))}

          
          </Grid>
        </Box>

        <Box
          sx={{
            mt: "20px",
            display: "flex",
            justifyContent: "flex-end",
            columnGap: "15px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "120px",
              borderColor: "origin.main",
              color: "primary.main",
              "&:hover": {
                borderColor: "origin.main",
              },
            }}
            onClick={handleCancel}
          >
            {t("Cancel")}
          </Button>
          <ButtonAction
            name={t("Reset")}
            onClick={handleReset}
            type="reset"
          />
          <ButtonLoader name={t("Submit")}
          onClick={() => handleSubmit(hanldeCreate)()}
          type="submit"
          loading={loading}
          disableOnLoading
        >
          {t("Submit")}
        </ButtonLoader>
        </Box>
      </BoxStyled>
    </Box>
  );
};

export default ${ComponentName}Create;
`;
const index = `
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
import React, { useMemo,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import ChangeStatus from "../components/ChangeStatus";
import { use${ComponentName} } from "hooks/${fileName}/use${ComponentName}";
import ${ComponentName}Update from "./${ComponentName}Update";
import DeleteDialog from "../components/Dialog";

const ${ComponentName}Index = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = use${ComponentName}();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [
      t("first name"),
      t("status"),
      t("operations"),
    ];
  }, [t]);
  
  const handleView = useCallback((id) => { navigate('view/' + id) }, [navigate])
  const handleEdit = useCallback((id) => { setEditedID(id) }, [setEditedID])
  

  const rows = useMemo(() => {
    return data?.${fileName}?.map((${fileName}, id) => (
      <TableRow sx={{ height: "65px" }} key={${fileName}.id} hover>
        <TableCell sx={{ minWidth: 50 }}>{${fileName}?.first_name ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 120 }} align="center">
          <ChangeStatus
            id={${fileName}.id}
            action={${fileName}.status === "active" && "change-status"}
          >
            {${fileName}.status === "Active" ? t("Active") : t("Not Active")}
          </ChangeStatus>
        </TableCell>
        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton onClick={() => handleEdit(${fileName}?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={${fileName}?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => handleView(${fileName}.id)}>
            <Tooltip title={direction === "ltr" ? "View" : "مشاهدة"}>
              <VisibilityTwoToneIcon color="primary" />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  },[data, count, direction, handleEdit, handleView, page,t]);

  const handleCreate = () => navigate("create")

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <${ComponentName}Update id={editedID} />}

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
            {t("${fileName}")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            sx={{
              color: "primary.main",
              backgroundColor: "origin.main",
              "&:hover": { backgroundColor: "origin.main" },
            }}
            onClick={handleCreate}
          >
            {t("New ${fileName}")}
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

export default ${ComponentName}Index;
`;

const update = `
import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
import { colorStore } from "store/ColorsStore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { TextFieldStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { _${ComponentName} } from "api/${fileName}/${fileName}";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
const schema = yup.object().shape({
  kr: yup.object().shape({
    name: yup.string().required("Kurdish name is required"),
  }),
  ar: yup.object().shape({
    name: yup.string().required("Arabic name is required"),
  }),
  en: yup.object().shape({
    name: yup.string().required("English name is required"),
  }),
});

const ${ComponentName}Update = ({ id }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    _axios.get('/${fileName}/'+ editedID).then((res) => {
      // setData(res.data?.${fileName});
        setData(res.data?.data);
    });
  }, [id,editedID]);
  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "en", name: "English" },
    { code: "kr", name: "Kurdish" },
  ];

  const details = languages.map((lang, index) => ({
    head: t("name"+ lang.name.toLowerCase()),
    type: "text",
    placeholder: t("name"),
    register: lang.code+".name",
    defaultValue: data?.translations[index]?.name,
  }));
  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data))

  async function createPost(data) {
    _${ComponentName}.update({
      editedID: editedID,
      formData: data,
    }).catch(err => {
      setLoading(false)
    }).then(() => {
      setLoading(false)
      // handleClose()
    })
  }

  const hanldeUpdate = (input) => {
    mutate(input);
    setLoading(true);
  }

  return (
    <>
      {loading && <Loader />}
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle sx={{ color: "primary.main" }}>{t("Edit Row")}</DialogTitle>
        {!!data && (
          <>
            <Grid container component="form" key={id}>
              {details?.map((item, index) => {
                const error = errors?.[item.register.split(".")[0]]?.name;
                return (
                  <Grid key={index} item md={6} sx={{ p: "10px" }}>
                    <Box sx={{ margin: "0 0 8px 5px" }}>
                      <Typography variant="body1">{item.head}</Typography>
                    </Box>
                    <TextFieldStyled
                      sx={{ width: "100%" }}
                      type={item.type}
                      placeholder={item.placeholder}
                      defaultValue={item.defaultValue}
                      name={item.register}
                      {...register(item.register)}
                      error={!!error}
                      helperText={error?.message || ""}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "primary.main" }}>
            {t("Cancel")}
          </Button>
          {loading && <Loader />}

          <ButtonLoader name={t("Submit")}
            onClick={() => handleSubmit(hanldeUpdate)()}
            type="save"
            loading={loading}
            disableOnLoading
          >
            {t("Submit")}
          </ButtonLoader>

        </DialogActions>
      </Dialog>
    </>
  );
};

export default ${ComponentName}Update;

`;
const view = `
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
const ${ComponentName}View = () => {
  const { t } = useTranslation("index");
  const [direction] = settingsStore((state) => [state.direction]);
  const params = useParams();
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  const { data, isLoading } = useQuery(
    ["${fileName}", 'id-'+ params.id],
  async () => {
    return await _axios
      .get('/${fileName}/' + params.id)
      .then((res) => res.data?.${fileName}s);
  },
    {}
  )

const columns = [
  { head: t("first name"), value: data?.first_name },
];

return (
  <>
    {isLoading && <Loader />}
    {!!data && (
      <div>
        <Typography
          sx={{
            backgroundColor: "card.main",
            borderRadius: "5px",
            color: 'primary.main',
            width: "40%",
            marginInline: 'auto',
            height: "100%",
            textTransform: "uppercase",
            padding: '10px 20px',
            textAlign: 'center'
          }}
          variant="h5"
        >
          {data.first_name}
        </Typography>
        <Box
          key={params.id}
          sx={{
            display: "flex",
            color: "lightGray.main",
            columnGap: 10,
            marginTop: "4%",
            justifyContent: "center",
          }}
        >
          <Box
            hover
            sx={{
              display: "flex",
              justifyContent: 'center',
              color: "text.main",
              height: "100%",
              flexWrap: 'wrap',
              columnGap: 2,
            }}
          >
            <Box
              sx={{
                width: "70%",
                backgroundColor: "card.main",
                borderRadius: "5px",
                padding: '20px'
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 2.1,
                }}
              >
                <h3>
                  {t("Details")}
                </h3>
                <Box sx={{
                  display: 'flex',
                  width: '100%',
                  flexWrap: "wrap",
                }}>
                  {columns?.map((item, index, id) => (
                    <Box
                      key={id}
                      sx={{
                        display: "flex",
                        pl: "10px",
                        width: "50%",
                        my: '5px'
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: "700",
                          fontSize: "15px",
                          marginInlineEnd: "15px",
                        }}
                      >
                        {item.head}:
                      </Typography>
                      <Typography variant="p">
                        {typeof item?.value === "object"
                          ? JSON.stringify(item?.value)
                          : item?.value ?? "null"}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    )}

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

export default ${ComponentName}View;
`;

const api = `
import { _axios } from "../../interceptor/http-config";

const Link = "/${fileName}"

export const _${ComponentName} = {
    index: () => _axios.get(Link).then((res) => res.data),

    post: (data) => _axios.post(Link, data).then((res) => res?.data),

    delete: (id) => _axios.delete(Link+'/' + id).then((res) => res.data),

    update: ({ editedID, formData }) => _axios.post( Link +'/' + editedID, formData).then((res) => res?.data),
};
`;
const useFile = `
import { useState } from "react";
import { useQuery } from "react-query";
import { _${ComponentName} } from "api/${fileName}/${fileName}";

export const use${ComponentName} = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["${fileName}", page, count, query],
    () =>
      _${ComponentName}
        .index({
          query,
          page,
          count,
        })
        .then((res) => res)
  );

  return {
    data,
    isLoading,
    page,
    setPage,
    count,
    setCount,
    refetch,
    setQuery,
  };
};
`;
const useDelete = `
import { useQueryClient, useMutation } from "react-query";
import { _${ComponentName} } from "api/${fileName}/${fileName}";

export const useDelete${ComponentName} = ({ page, count }) => {
  const queryClient = useQueryClient();
  return useMutation((id) => _${ComponentName}.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["${fileName}", page, count]);
      const previousData = queryClient.getQueriesData(["${fileName}", page, count]);
      queryClient.setQueryData(["${fileName}", page, count], (oldQueryData) => {
        const oldQueryDataCopy = oldQueryData?.companies.filter(
          (old) => +old.id !== +id
        );
        return oldQueryDataCopy;
      });
      return {
        previousData,
      }
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(["${fileName}", page, count]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["${fileName}", page, count], context.prevuiosQuery);
    },
  });
};
`;
fs.writeFileSync(
  path.join(dirPath, componentName, `${ComponentName}Routing.jsx`),
  tsContent
);
fs.writeFileSync(
  path.join(dirPath, componentName, `${ComponentName}Component.jsx`),
  component
);
// * folders
fs.mkdirSync(path.join(dirPath, fileName, "hooks"));
fs.mkdirSync(path.join(dirPath, fileName, "components"));
fs.mkdirSync(path.join(dirPath, fileName, "pages"));

// * creating components
fs.writeFileSync(
  path.join(dirPath, componentName, "components", `ChangeStatus.jsx`),
  changeStatus
);
fs.writeFileSync(
  path.join(dirPath, componentName, "components", `Dialog.jsx`),
  dialog
);
// *creating component hooks
fs.writeFileSync(
  path.join(dirPath, componentName, "hooks", `useChangeStatus.js`),
  useChangStatus
);
fs.writeFileSync(
  path.join(dirPath, componentName, "hooks", `use${ComponentName}Create.js`),
  useCreate
);
// *creating pages
fs.writeFileSync(
  path.join(dirPath, componentName, "pages", `${ComponentName}Create.jsx`),
  create
);
fs.writeFileSync(
  path.join(dirPath, componentName, "pages", `${ComponentName}Index.jsx`),
  index
);
fs.writeFileSync(
  path.join(dirPath, componentName, "pages", `${ComponentName}Update.jsx`),
  update
);
fs.writeFileSync(
  path.join(dirPath, componentName, "pages", `${ComponentName}View.jsx`),
  view
);

//* creating api file
fs.writeFileSync(path.join(apidirPath, fileName, `${fileName}.js`), api);
// * hooks
fs.writeFileSync(
  path.join(HooksdirPath, fileName, `use${ComponentName}.js`),
  useFile
);
fs.writeFileSync(
  path.join(HooksdirPath, fileName, `useDelete${ComponentName}.js`),
  useDelete
);

// fs.writeFileSync(path.join(dirPath, componentName, fileName, `${ fileName } View.js`), view);
