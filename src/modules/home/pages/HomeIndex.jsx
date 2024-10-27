import {
  Typography,
  Box,
  IconButton,
  Tooltip,
  CardContent,
  Card,
  Grid,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import Loader from "components/shared/Loader";
import { useHome } from "hooks/home/useHome";
import StatsUpdate from "../components/StatesUpdate"; // Import Status Update Module
import CtaUpdate from "../components/CtaUpdate"; // Import CTA Update Module
import TextSectionOneUpdate from "../components/TextSectionUpdate"; // Import Text Section One Update
import TextSectionTwoUpdate from "../components/TextSectionTowUpdate"; // Import Text Section Two Update
import VideoUpdate from "../components/VedioUpdate"; // Import Video Update Module
import { _Home } from "api/home/home";
import { useNavigate } from "react-router-dom";
import { ViewCarousel } from "@mui/icons-material";
import SlidesView from "./SlidesView";
import { useQueryClient } from "react-query";

const HomeIndex = () => {
  const { data, isLoading } = useHome();
  const {
    "home.page.status": status,
    "home.page.cta": cta,
    "home.page.textSectionOne": textSectionOne,
    "home.page.textSectionTwo": textSectionTwo,
    "home.page.video": video,
    "home.page.videoText": videoText,
  } = data ?? {};

  const [direction] = settingsStore((state) => [state.direction]);
  const [open, setOpen] = useState(false);
  const [editSection, setEditSection] = useState(null); // Track the section being edited

  const handleEditClick = (section) => {
    setEditSection(section);
    setOpen(true);
  };

  const queryClient = useQueryClient();
  const handleClose = () => {
    setOpen(false);
    setEditSection(null);
  };

  async function handleUpdate(formDataNew) {
    _Home
      .update({
        formData: formDataNew,
      })
      .then((res) => {
        if (res?.code === 200) handleClose();
        queryClient.invalidateQueries("home");
      });
  }
  async function handleUpdateStatus(data) {
    const formDataNew = new FormData();

    // Append status data (titles and subtitles)
    if (data?.name === "home.page.status") {
      for (const lang of ["ar", "en", "kr"]) {
        if (data?.value && data?.value[lang]?.subtitle1) {
          formDataNew.append(
            `status[${lang}][subtitle1]`,
            data?.value[lang]?.subtitle1
          );
        } else formDataNew.append(`status[${lang}][subtitle1]`, " ");

        if (data?.value && data?.value[lang]?.title1) {
          formDataNew.append(
            `status[${lang}][title1]`,
            data?.value[lang]?.title1
          );
        } else formDataNew.append(`status[${lang}][title1]`, " ");

        if (data?.value && data?.value[lang]?.subtitle2) {
          formDataNew.append(
            `status[${lang}][subtitle2]`,
            data?.value[lang]?.subtitle2
          );
        } else formDataNew.append(`status[${lang}][subtitle2]`, " ");

        if (data?.value && data?.value[lang]?.title2) {
          formDataNew.append(
            `status[${lang}][title2]`,
            data?.value[lang]?.title2
          );
        } else formDataNew.append(`status[${lang}][title2]`, " ");
      }

      // Append info data (number and text)
      if (data?.value?.info) {
        data.value.info.forEach((infoItem, index) => {
          if (infoItem.number) {
            formDataNew.append(
              `status[info][${index}][number]`,
              infoItem.number
            );
          } else formDataNew.append(`status[info][${index}][number]`, " ");
          for (const lang of ["ar", "en", "kr"]) {
            if (infoItem[lang]?.text) {
              formDataNew.append(
                `status[info][${index}][${lang}][text]`,
                infoItem[lang].text
              );
            } else
              formDataNew.append(`status[info][${index}][${lang}][text]`, " ");
          }
        });
      }
    }

    // Append status info data (numbers and localized text)
    if (data?.status?.info) {
      data.status.info.forEach((infoItem, index) => {
        // Append the number
        if (infoItem?.number) {
          formDataNew.append(`status[info][${index}][number]`, infoItem.number);
        }

        // Append the localized text for each language
        for (const lang of ["ar", "en", "kr"]) {
          if (infoItem?.[lang]?.text) {
            formDataNew.append(
              `status[info][${index}][${lang}][text]`,
              infoItem[lang].text
            );
          }
        }
      });
    }

    _Home
      .update({
        formData: formDataNew,
      })
      .then((res) => {
        if (res?.code === 200) handleClose();
        queryClient.invalidateQueries("home");
      });
  }

  // Render the correct modal based on the section being edited
  const renderUpdateModal = () => {
    switch (editSection) {
      case status:
        return (
          <StatsUpdate
            open={open}
            onClose={handleClose}
            initialData={status}
            handleSave={handleUpdateStatus}
          />
        );
      case cta:
        return (
          <CtaUpdate
            open={open}
            onClose={handleClose}
            initialData={cta}
            handleSave={handleUpdate}
          />
        );
      case textSectionOne:
        return (
          <TextSectionOneUpdate
            open={open}
            onClose={handleClose}
            initialData={textSectionOne}
            handleSave={handleUpdate}
          />
        );
      case textSectionTwo:
        return (
          <TextSectionTwoUpdate
            open={open}
            onClose={handleClose}
            initialData={textSectionTwo}
            handleSave={handleUpdate}
          />
        );
      case video:
        return (
          <VideoUpdate
            open={open}
            onClose={handleClose}
            initialVideoData={video}
            initialTextData={videoText}
            handleSave={handleUpdate}
          />
        );
      // Add more cases as needed for other sections
      default:
        return null;
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {isLoading && <Loader />}
      {renderUpdateModal()}
      <IconButton onClick={() => navigate(`addslider`)}>
        <Tooltip title={"add slider"}>
          <ViewCarousel sx={{ color: "warning.main" }} />+ Add Slides
        </Tooltip>
      </IconButton>

      <SlidesView />
      {data && (
        <Box p={2} sx={{ color: "text.primary" }}>
          <Grid container spacing={3}>
            {/* Status Section */}
            {status?.value && (
              <>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5">Status (Arabic)</Typography>
                      <Typography variant="body1">
                        {status?.value?.ar?.title1 ?? "NON"}{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="initial"
                        dangerouslySetInnerHTML={{
                          __html: `${status?.value?.ar?.subtitle1 ?? "NON"}`,
                        }}
                      ></Typography>

                      <Typography variant="body1">
                        {status?.value?.ar?.title2 ?? "NON"}{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="initial"
                        dangerouslySetInnerHTML={{
                          __html: `${status?.value?.ar?.subtitle2 ?? "NON"} `,
                        }}
                      ></Typography>
                      <hr />
                      <Typography variant="h5">Status (English)</Typography>
                      <Typography variant="body1">
                        {status?.value?.en?.title1 ?? "NON"}{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="initial"
                        dangerouslySetInnerHTML={{
                          __html: `${status?.value?.en?.subtitle1 ?? "NON"}`,
                        }}
                      ></Typography>
                      <Typography variant="body1">
                        {status?.value?.en?.title2 ?? "NON"} -{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="initial"
                        dangerouslySetInnerHTML={{
                          __html: `${status?.value?.en?.subtitle2 ?? "NON"}`,
                        }}
                      ></Typography>
                      <hr />
                      <Typography variant="h5">Status (Kurdish)</Typography>
                      <Typography variant="body1">
                        {status.value.kr?.title1 ?? "NON"} -{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="initial"
                        dangerouslySetInnerHTML={{
                          __html: `${status?.value?.kr?.subtitle1 ?? "NON"}`,
                        }}
                      ></Typography>

                      <Typography variant="body1">
                        {status.value.kr.title2 ?? "NON"} -{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="initial"
                        dangerouslySetInnerHTML={{
                          __html: `${status?.value?.kr?.subtitle2 ?? "NON"}`,
                        }}
                      ></Typography>
                      <Grid container spacing={3}>
                        {[0, 1, 2].map((index) => (
                          <Grid md="4" item>
                            arabic:{" "}
                            {/* {status?.value?.info[index]?.ar?.text ?? "NON"} */}
                            {Array.isArray(status?.value?.info) &&
                            status?.value?.info[index]?.ar?.text
                              ? status?.value?.info[index]?.ar?.text
                              : "NON"}
                            <br /> english: {/* Check for English text */}
                            {Array.isArray(status?.value?.info) &&
                            status?.value?.info[index]?.en?.text
                              ? status.value.info[index].en.text
                              : "NON"}
                            <br />
                            kurdish: {/* Check for Kurdish text */}
                            {Array.isArray(status?.value?.info) &&
                            status?.value?.info[index]?.kr?.text
                              ? status.value.info[index].kr.text
                              : "NON"}
                            <br />
                            number: {/* Check for number */}
                            {Array.isArray(status?.value?.info) &&
                            status?.value?.info[index]?.number
                              ? status.value.info[index].number
                              : "NON"}{" "}
                          </Grid>
                        ))}
                      </Grid>
                      <IconButton onClick={() => handleEditClick(status)}>
                        <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                          <ModeTwoToneIcon sx={{ color: "text.main" }} />
                        </Tooltip>
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}

            {/* CTA Section */}
            {cta?.value && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Call to Action (CTA)</Typography>

                    {/* Check if title and subtitle exist before accessing their properties */}
                    <Typography variant="body1">
                      Arabic:{" "}
                      {cta.value?.title?.ar ? cta.value.title.ar : "NON"} -{" "}
                      {cta.value?.subtitle?.ar ? cta.value.subtitle.ar : "NON"}
                    </Typography>
                    <Typography variant="body1">
                      English:{" "}
                      {cta.value?.title?.en ? cta.value.title.en : "NON"} -{" "}
                      {cta.value?.subtitle?.en ? cta.value.subtitle.en : "NON"}
                    </Typography>
                    <Typography variant="body1">
                      Kurdish:{" "}
                      {cta.value?.title?.kr ? cta.value.title.kr : "NON"} -{" "}
                      {cta.value?.subtitle?.kr ? cta.value.subtitle.kr : "NON"}
                    </Typography>

                    {/* Check if link exists */}
                    <Link
                      href={cta.value?.link ? cta.value.link : "NON"}
                      target="_blank"
                      rel="noopener"
                    >
                      CTA Link
                    </Link>

                    <IconButton onClick={() => handleEditClick(cta)}>
                      <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                        <ModeTwoToneIcon sx={{ color: "text.main" }} />
                      </Tooltip>
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Text Section One */}
            {textSectionOne?.value && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Text Section One</Typography>
                    <Typography
                      variant="body1"
                      sx={{ borderBottom: "1px solid black" }}
                      dangerouslySetInnerHTML={{
                        __html: `  Arabic: ${
                          textSectionOne.value.text.ar ?? "NON"
                        }`,
                      }}
                    ></Typography>
                    <Typography
                      variant="body1"
                      sx={{ borderBottom: "1px solid black" }}
                      dangerouslySetInnerHTML={{
                        __html: ` English: ${
                          textSectionOne.value.text.en ?? "NON"
                        }`,
                      }}
                    ></Typography>
                    <Typography
                      variant="body1"
                      sx={{ borderBottom: "1px solid black" }}
                      dangerouslySetInnerHTML={{
                        __html: ` Kurdish: ${
                          textSectionOne.value.text.kr ?? "NON"
                        }`,
                      }}
                    ></Typography>
                    <Box mt={2}>
                      <img
                        src={textSectionOne?.image}
                        alt="Text Section Two"
                        width="100%"
                      />
                    </Box>
                    <IconButton onClick={() => handleEditClick(textSectionOne)}>
                      <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                        <ModeTwoToneIcon sx={{ color: "text.main" }} />
                      </Tooltip>
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Text Section Two */}
            {textSectionTwo?.value && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Text Section Two</Typography>
                    <Typography
                      variant="body1"
                      sx={{ borderBottom: "1px solid black" }}
                      dangerouslySetInnerHTML={{
                        __html: ` Arabic: ${
                          textSectionTwo.value.text.ar ?? "NON"
                        }`,
                      }}
                    ></Typography>
                    <Typography
                      variant="body1"
                      sx={{ borderBottom: "1px solid black" }}
                      dangerouslySetInnerHTML={{
                        __html: `English: ${
                          textSectionTwo.value.text.en ?? "NON"
                        }`,
                      }}
                    ></Typography>
                    <Typography
                      variant="body1"
                      sx={{ borderBottom: "1px solid black" }}
                      dangerouslySetInnerHTML={{
                        __html: `Kurdish: ${
                          textSectionTwo.value.text.kr ?? "NON"
                        }`,
                      }}
                    ></Typography>
                    <Box mt={2}>
                      <img
                        src={textSectionTwo.image ?? "NON"}
                        alt="Text Section Two"
                        width="100%"
                      />
                    </Box>
                    <IconButton onClick={() => handleEditClick(textSectionTwo)}>
                      <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                        <ModeTwoToneIcon sx={{ color: "text.main" }} />
                      </Tooltip>
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Video Section */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Video Section</Typography>
                  <video width="100%" controls>
                    <source src={video?.video ?? ""} type="video/mp4" />
                  </video>
                  {videoText?.value && (
                    <>
                      <Typography variant="h5">Video Text</Typography>
                      <Typography
                        variant="body1 "
                        sx={{ borderBottom: "1px solid black" }}
                        dangerouslySetInnerHTML={{
                          __html: `   Arabic: ${videoText?.value?.ar ?? "NON"}`,
                        }}
                      ></Typography>
                      <Typography
                        variant="body1"
                        sx={{ borderBottom: "1px solid black" }}
                        dangerouslySetInnerHTML={{
                          __html: `  English: ${videoText?.value?.en ?? "NON"}`,
                        }}
                      ></Typography>
                      <Typography
                        variant="body1"
                        sx={{ borderBottom: "1px solid black" }}
                        dangerouslySetInnerHTML={{
                          __html: `Kurdish: ${videoText?.value?.kr ?? "NON"}`,
                        }}
                      ></Typography>
                    </>
                  )}
                  <IconButton onClick={() => handleEditClick(video)}>
                    <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                      <ModeTwoToneIcon sx={{ color: "text.main" }} />
                    </Tooltip>
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default HomeIndex;
