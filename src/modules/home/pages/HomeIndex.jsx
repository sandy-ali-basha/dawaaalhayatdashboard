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
import StatsUpdate from "../components/StatesUpdate"; // Import Stats Update Module
import CtaUpdate from "../components/CtaUpdate"; // Import CTA Update Module
import TextSectionOneUpdate from "../components/TextSectionUpdate"; // Import Text Section One Update
import TextSectionTwoUpdate from "../components/TextSectionTowUpdate"; // Import Text Section Two Update
import VideoUpdate from "../components/VedioUpdate"; // Import Video Update Module
import { _Home } from "api/home/home";

const HomeIndex = () => {
  const { data, isLoading } = useHome();
  const {
    "home.page.stats": stats,
    "home.page.cta": cta,
    "home.page.textSectionOne": textSectionOne,
    "home.page.textSectionTwo": textSectionTwo,
    "home.page.video": video,
    "home.page.videoText": videoText,
  } = data || {};

  const [direction] = settingsStore((state) => [state.direction]);
  const [open, setOpen] = useState(false);
  const [editSection, setEditSection] = useState(null); // Track the section being edited

  const handleEditClick = (section) => {
    setEditSection(section);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditSection(null);
  };
  async function handleUpdate(data) {
    // Create a new FormData object
    const formDataNew = new FormData();
    console.log("data", data);

    // Append video and text data to FormData
    if (data.video) {
      formDataNew.append("video[vfile]", data.video); // Append video file
    }
    if (data?.textSectionTwoImage?.image) {
      formDataNew.append(
        "textSectionTwo[image_file]",
        data.textSectionTwoImage?.image
      ); // Append video file
    }
    if (data?.textSectionOneImage?.image) {
      formDataNew.append(
        "textSectionOne[image_file]",
        data.textSectionOneImage?.image
      ); // Append video file
    }

    for (const lang of ["ar", "en", "kr"]) {
      if (data.videoText && data.videoText[lang]) {
        formDataNew.append(`videoText[${lang}]`, data.videoText[lang]);
      }
    }

    for (const lang of ["ar", "en", "kr"]) {
      if (data?.cta && data?.cta?.subtitle[lang]) {
        formDataNew.append(`cta[subtitle][${lang}]`, data?.cta?.subtitle[lang]);
      }
    }
    for (const lang of ["ar", "en", "kr"]) {
      if (data?.cta && data?.cta?.title[lang]) {
        formDataNew.append(`cta[title][${lang}]`, data?.cta?.title[lang]);
      }
    }
    for (const lang of ["ar", "en", "kr"]) {
      if (data?.status && data?.status[lang]?.subtitle1) {
        formDataNew.append(
          `status[${lang}][subtitle1]`,
          data?.status[lang]?.subtitle1
        );
      }
    }
    for (const lang of ["ar", "en", "kr"]) {
      if (data?.status && data?.status[lang]?.title1) {
        formDataNew.append(
          `status[${lang}][title1]`,
          data?.status[lang]?.title1
        );
      }
    }
    for (const lang of ["ar", "en", "kr"]) {
      if (data?.status && data?.status[lang]?.subtitle2) {
        formDataNew.append(
          `status[${lang}][subtitle2]`,
          data?.status[lang]?.subtitle2
        );
      }
    }
    for (const lang of ["ar", "en", "kr"]) {
      if (data?.status && data?.status[lang]?.title2) {
        formDataNew.append(
          `status[${lang}][title2]`,
          data?.status[lang]?.title2
        );
      }
    }

    for (const lang of ["ar", "en", "kr"]) {
      if (data.textSectionTwo && data.textSectionTwo[lang]) {
        formDataNew.append(
          `textSectionTwo[text][${lang}]`,
          data.textSectionTwo[lang]
        );
      }
    }

    for (const lang of ["ar", "en", "kr"]) {
      if (data.textSectionOne && data.textSectionOne[lang]) {
        formDataNew.append(
          `textSectionOne[text][${lang}]`,
          data.textSectionOne[lang]
        );
      }
    }

    // Call your update method with the FormData
    _Home
      .update({
        formData: formDataNew,
      })
      .then((res) => {
        console.log(res);

        if (res?.code === 200) handleClose();
      });
  }

  // Render the correct modal based on the section being edited
  const renderUpdateModal = () => {
    switch (editSection) {
      case stats:
        return (
          <StatsUpdate
            open={open}
            onClose={handleClose}
            initialData={stats}
            handleSave={handleUpdate}
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

  return (
    <>
      {isLoading && <Loader />}
      {renderUpdateModal()}
      {data && (
        <Box p={2} sx={{ color: "text.primary" }}>
          <Grid container spacing={3}>
            {/* Stats Section */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Stats (Arabic)</Typography>
                  <Typography variant="body1">
                    {stats.value.ar.title1} - {stats.value.ar.subtitle1}
                  </Typography>
                  <Typography variant="body1">
                    {stats.value.ar.title2} - {stats.value.ar.subtitle2}
                  </Typography>
                  <Typography variant="h5">Stats (English)</Typography>
                  <Typography variant="body1">
                    {stats.value.en.title1} - {stats.value.en.subtitle1}
                  </Typography>
                  <Typography variant="body1">
                    {stats.value.en.title2} - {stats.value.en.subtitle2}
                  </Typography>
                  <Typography variant="h5">Stats (Kurdish)</Typography>
                  <Typography variant="body1">
                    {stats.value.kr.title1} - {stats.value.kr.subtitle1}
                  </Typography>
                  <Typography variant="body1">
                    {stats.value.kr.title2} - {stats.value.kr.subtitle2}
                  </Typography>
                  <IconButton onClick={() => handleEditClick(stats)}>
                    <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                      <ModeTwoToneIcon sx={{ color: "text.main" }} />
                    </Tooltip>
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>

            {/* CTA Section */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Call to Action (CTA)</Typography>
                  <Typography variant="body1">
                    Arabic: {cta.value.title.ar} - {cta.value.subtitle.ar}
                  </Typography>
                  <Typography variant="body1">
                    English: {cta.value.title.en} - {cta.value.subtitle.en}
                  </Typography>
                  <Typography variant="body1">
                    Kurdish: {cta.value.title.kr} - {cta.value.subtitle.kr}
                  </Typography>
                  <Link href={cta.value.link} target="_blank" rel="noopener">
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

            {/* Text Section One */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Text Section One</Typography>
                  <Typography variant="body1">
                    Arabic: {textSectionOne.value.text.ar}
                  </Typography>
                  <Typography variant="body1">
                    English: {textSectionOne.value.text.en}
                  </Typography>
                  <Typography variant="body1">
                    Kurdish: {textSectionOne.value.text.kr}
                  </Typography>
                  <IconButton onClick={() => handleEditClick(textSectionOne)}>
                    <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                      <ModeTwoToneIcon sx={{ color: "text.main" }} />
                    </Tooltip>
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>

            {/* Text Section Two */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Text Section Two</Typography>
                  <Typography variant="body1">
                    Arabic: {textSectionTwo.value.text.ar}
                  </Typography>
                  <Typography variant="body1">
                    English: {textSectionTwo.value.text.en}
                  </Typography>
                  <Typography variant="body1">
                    Kurdish: {textSectionTwo.value.text.kr}
                  </Typography>
                  <Box mt={2}>
                    <img
                      src={textSectionTwo.image}
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

            {/* Video Section */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Video Section</Typography>
                  <video width="100%" controls>
                    <source src={video.video} type="video/mp4" />
                  </video>
                  <IconButton onClick={() => handleEditClick(video)}>
                    <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                      <ModeTwoToneIcon sx={{ color: "text.main" }} />
                    </Tooltip>
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>

            {/* Video Text Section */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Video Text</Typography>
                  <Typography variant="body1">
                    Arabic: {videoText.value.ar}
                  </Typography>
                  <Typography variant="body1">
                    English: {videoText.value.en}
                  </Typography>
                  <Typography variant="body1">
                    Kurdish: {videoText.value.kr}
                  </Typography>
                  <IconButton onClick={() => handleEditClick(videoText)}>
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
