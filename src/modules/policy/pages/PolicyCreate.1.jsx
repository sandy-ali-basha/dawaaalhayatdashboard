import { Typography, Box, Button, Grid } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React from "react";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import ButtonLoader from "components/shared/ButtonLoader";
import { usePolicyCreate } from "../hooks/usePolicyCreate";
import { Editor, EditorState } from 'draft-js';

export const PolicyCreate = () => {
    const {
        handleCancel, hanldeCreate, register, handleSubmit, handleReset, loading, t, errors, details,
    } = usePolicyCreate();
    function MyEditor() {
        const [editorState, setEditorState] = React.useState(
            () => EditorState.createEmpty()
        );

        return <Editor editorState={editorState} onChange={setEditorState} />;
    }
    return (
        <Box>
            {loading && <Loader />}
            <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
                {t("Create Terms}")}
            </Typography>
            <BoxStyled sx={{ px: "24px" }}>
                <Box component="form">
                    <Grid container spacing={2}>
                        {/* * //details */}
                        {details.map((item, index) => (
                            <Grid key={index} xs={6} sx={{ p: "10px" }}>
                                <Box sx={{ margin: "0 0 8px 5px" }}>
                                    <Typography variant="body1" color="text.secondary">{item.head}</Typography>
                                </Box>
                                <TextFieldStyled
                                    sx={{ width: "100%" }}
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    name={item.name}
                                    {...register(item.register)}
                                    error={errors[item.error]?.message}
                                    helperText={errors[item.helperText]?.message || ""} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <MyEditor />

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
                            color: "text.main",
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
                        type="reset" />
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
