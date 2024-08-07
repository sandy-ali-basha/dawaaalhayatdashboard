import { Box, FormControl, FormHelperText, Typography } from "@mui/material"
import { SelectStyled, MenuItemStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";

const GenderSelect = ({ register, errors }) => {
    const { t } = useTranslation("index")

    return (
        <FormControl fullWidth>
            <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" color="text.secondary">{t('gender')}</Typography>
            </Box>
            <SelectStyled
                sx={{ color: 'text.main', borderColor: "text.main" }}
                label="ender"
                {...register('gender')}
                error={errors.gender?.message}
                helperText={errors.gender?.message || ""}
            >
                <MenuItemStyled value={'female'}><Box style={{ color: 'text.main' }}>{t('femail')}</Box></MenuItemStyled>
                <MenuItemStyled value={'male'}><Box style={{ color: 'text.main' }}>{('male')}</Box></MenuItemStyled>
            </SelectStyled>
            <FormHelperText error>{errors.gender?.message}</FormHelperText>
        </FormControl>
    )
}
export default GenderSelect