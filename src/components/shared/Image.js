import { Edit, Upload } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Image = ({ errors, control, register, name, setImage, image }) => {
    const { t } = useTranslation("index")
    //* new image url to preview
    const [NewImage, setNewImage] = useState(null);

    const handleImage = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setNewImage(e.target.result);
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="inputTitle" >{t(name)}</Typography>
            </Box>
            <Button
                component="label"
                sx={{
                    border: `1px dashed`,
                    borderColor: `${errors ? 'error.main' : 'text.main'}`,
                    width: '100%'
                }}
                htmlFor={name}>
                {NewImage || image ?
                    <>
                        <Edit sx={{ mx: '5px' }} fontSize="medium" />{'  '}
                        <span>{t('Change Image')}</span>
                    </> :
                    <>
                        <Upload sx={{ mx: '5px' }} fontSize="medium" />{'  '}
                        <p>{t('Upload Image')}</p>
                    </>
                }
                <Controller
                    control={control}
                    name={name}
                    {...register(name)}
                    render={({ field }) => (
                        <input
                            id={name}
                            type="file"
                            accept="image/*"
                            onChange={e => {
                                handleImage(e);
                                field.onChange(e.target.files)
                            }}
                            style={{ display: 'none' }}
                        />
                    )}
                />
            </Button >
            <Typography sx={{ color: 'error.main' }}>{errors}</Typography>
            <Box sx={{ width: '300px' }
            }>
                {NewImage || image ? <img style={{ width: '100%', margin: ' 1rem', borderRadius: '5px' }} src={NewImage || image} alt=" " /> : null}
            </Box>
        </>
    )
}

export default Image