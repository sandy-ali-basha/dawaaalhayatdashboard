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
import { useNavigate } from "react-router-dom";
import { ViewCarousel } from "@mui/icons-material";
import SlidesView from "./SlidesView";

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
  const navigate = useNavigate();
  return (
    <>
      {/* //todo make sure slides is working */}
      {isLoading && <Loader />}
      {renderUpdateModal()}
      <IconButton onClick={() => navigate(`addslider`)}>
        <Tooltip title={"add slider"}>
          <ViewCarousel sx={{ color: "warning.main" }} />
           + Add Slides
        </Tooltip>
      </IconButton>

      <SlidesView />
      {data && (
        <Box p={2} sx={{ color: "text.primary" }}>
          <Grid container spacing={3}>
            {/* Stats Section */}
            {stats?.value && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Stats (Arabic)</Typography>
                    <Typography variant="body1">
                      {stats?.value?.ar?.title1 || "NON"} -{" "}
                      {stats?.value?.ar?.subtitle1 || "NON"}
                    </Typography>
                    <Typography variant="body1">
                      {stats?.value?.ar?.title2 || "NON"} -{" "}
                      {stats?.value?.ar?.subtitle2 || "NON"}
                    </Typography>
                    <Typography variant="h5">Stats (English)</Typography>
                    <Typography variant="body1">
                      {stats?.value?.en?.title1 || "NON"} -{" "}
                      {stats?.value?.en?.subtitle1 || "NON"}
                    </Typography>
                    <Typography variant="body1">
                      {stats?.value?.en?.title2 || "NON"} -{" "}
                      {stats?.value?.en?.subtitle2 || "NON"}
                    </Typography>
                    <Typography variant="h5">Stats (Kurdish)</Typography>
                    <Typography variant="body1">
                      {stats.value.kr.title1 || "NON"} -{" "}
                      {stats?.value.kr.subtitle1 || "NON"}
                    </Typography>
                    <Typography variant="body1">
                      {stats.value.kr.title2 || "NON"} -{" "}
                      {stats.value.kr.subtitle2 || "NON"}
                    </Typography>
                    <IconButton onClick={() => handleEditClick(stats)}>
                      <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                        <ModeTwoToneIcon sx={{ color: "text.main" }} />
                      </Tooltip>
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* CTA Section */}
            {cta?.value && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Call to Action (CTA)</Typography>
                    <Typography variant="body1">
                      Arabic: {cta.value.title.ar || "NON"} -{" "}
                      {cta.value.subtitle.ar || "NON"}
                    </Typography>
                    <Typography variant="body1">
                      English: {cta.value.title.en || "NON"} -{" "}
                      {cta.value.subtitle.en || "NON"}
                    </Typography>
                    <Typography variant="body1">
                      Kurdish: {cta.value.title.kr || "NON"} -{" "}
                      {cta.value.subtitle.kr || "NON"}
                    </Typography>
                    <Link
                      href={cta.value.link || "NON"}
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
                    <Typography variant="body1">
                      Arabic: {textSectionOne.value.text.ar || "NON"}
                    </Typography>
                    <Typography variant="body1">
                      English: {textSectionOne.value.text.en || "NON"}
                    </Typography>
                    <Typography variant="body1">
                      Kurdish: {textSectionOne.value.text.kr || "NON"}
                    </Typography>
                    <Box mt={2}>
                      <img
                        src={textSectionOne.image || "NON"}
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
                    <Typography variant="body1">
                      Arabic: {textSectionTwo.value.text.ar || "NON"}
                    </Typography>
                    <Typography variant="body1">
                      English: {textSectionTwo.value.text.en || "NON"}
                    </Typography>
                    <Typography variant="body1">
                      Kurdish: {textSectionTwo.value.text.kr || "NON"}
                    </Typography>
                    <Box mt={2}>
                      <img
                        src={textSectionTwo.image || "NON"}
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
                    <source src={video?.video || ""} type="video/mp4" />
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
            {videoText?.value && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Video Text</Typography>
                    <Typography variant="body1">
                      Arabic: {videoText.value.ar || "NON"}
                    </Typography>
                    <Typography variant="body1">
                      English: {videoText.value.en || "NON"}
                    </Typography>
                    <Typography variant="body1">
                      Kurdish: {videoText.value.kr || "NON"}
                    </Typography>
                    <IconButton onClick={() => handleEditClick(videoText)}>
                      <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                        <ModeTwoToneIcon sx={{ color: "text.main" }} />
                      </Tooltip>
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default HomeIndex;
