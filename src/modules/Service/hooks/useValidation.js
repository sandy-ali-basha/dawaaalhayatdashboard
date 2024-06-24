
import { useTranslation } from "react-i18next";
import * as yup from "yup";
export const useValidation = () => {
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/webp",
    ]
    const MAX_FILE_SIZE = 1000000;
    const { t } = useTranslation("index")

    let validate = yup.object().shape({
        name_en: yup.string().trim().required("name_en is required"),
        name_de: yup.string().trim().required("name_de is required"),
        price_type: yup.string().trim().required("price_type is required"),
        image: yup
            .mixed()
            .test("File", t("image") + ' ' + t("is required"), (value) => {
                return value;
            })
            .test("fileSize", t("The file is too large"), (value) => {
                return value && value[0]?.size <= MAX_FILE_SIZE;
            })
            .test("fileFormat", t("Unsupported Format"), (value) => {
                return value && SUPPORTED_FORMATS.includes(value[0]?.type);
            }),
    })
    return { validate }
}