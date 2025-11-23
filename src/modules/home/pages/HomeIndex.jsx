import React, { useEffect, useState } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { useHome } from "hooks/home/useHome";
import { settingsStore } from "store/settingsStore";
import Loader from "components/shared/Loader";
import { _Home } from "api/home/home";
import { useQueryClient } from "react-query";

// Components
import TabsNavigation from "../components/tabs/TabsNavigation";
import SlidesTab from "../components/tabs/SlidesTab";
import StatusTab from "../components/tabs/StatusTab";
import CtaTab from "../components/tabs/CtaTab";
import TextSectionOneTab from "../components/tabs/TextSectionOneTab";
import TextSectionTwoTab from "../components/tabs/TextSectionTwoTab";
import VideoTab from "../components/tabs/VideoTab";

// Modals
import StatsUpdate from "../components/StatesUpdate";
import CtaUpdate from "../components/CtaUpdate";
import TextSectionOneUpdate from "../components/TextSectionUpdate";
import TextSectionTwoUpdate from "../components/TextSectionTowUpdate";
import VideoUpdate from "../components/VedioUpdate";
import HomeSection from "../components/tabs/HomeSection";

const HomeIndex = () => {
  const { data, isLoading } = useHome();
  const queryClient = useQueryClient();
  const [direction] = settingsStore((state) => [state.direction]);
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState([]);

  const [editSection, setEditSection] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    _Home
      .getAllSections()
      .then((res) => {
        // your API returns data directly as an array
        setSections(res?.home_sections || []);
        console.log("Fetched sections:", res?.home_sections);
      })
      .catch((err) => {
        console.error("Failed to fetch sections:", err);
      });
  }, []);

  const {
    "home.page.status": status,
    "home.page.cta": cta,
    "home.page.textSectionOne": textSectionOne,
    "home.page.textSectionTwo": textSectionTwo,
    "home.page.video": video,
    "home.page.videoText": videoText,
  } = data ?? {};

  const handleTabChange = (_, newValue) => setTabValue(newValue);
  const handleEditClick = (section) => {
    setEditSection(section);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditSection(null);
  };

  const handleUpdate = async (formDataNew) => {
    const res = await _Home.update({ formData: formDataNew });
    if (res?.code === 200) handleClose();
    queryClient.invalidateQueries("home");
  };

  const renderUpdateModal = () => {
    switch (editSection) {
      case status:
        return (
          <StatsUpdate
            open={open}
            onClose={handleClose}
            initialData={status}
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
      default:
        return null;
    }
  };

  if (isLoading)
    return (
      <Box sx={{ p: 4 }}>
        <Loader />
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={100}
            animation="wave"
            sx={{ my: 2, borderRadius: 2 }}
          />
        ))}
      </Box>
    );

  return (
    <Box p={3}>
      {renderUpdateModal()}
      <Typography
        variant="h5"
        sx={{ color: "text.main", fontWeight: "bold", mb: 2 }}
      >
        Home Page Management
      </Typography>

      <TabsNavigation
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        sections={sections}
      />

      {tabValue === 0 && <SlidesTab />}
      {tabValue === 1 && (
        <StatusTab
          status={status}
          direction={direction}
          onEdit={handleEditClick}
        />
      )}
      {tabValue === 2 && (
        <CtaTab cta={cta} direction={direction} onEdit={handleEditClick} />
      )}
      {tabValue === 3 && (
        <TextSectionOneTab
          textSectionOne={textSectionOne}
          direction={direction}
          onEdit={handleEditClick}
        />
      )}
      {tabValue === 4 && (
        <TextSectionTwoTab
          textSectionTwo={textSectionTwo}
          direction={direction}
          onEdit={handleEditClick}
        />
      )}
      {tabValue === 5 && (
        <VideoTab
          video={video}
          videoText={videoText}
          direction={direction}
          onEdit={handleEditClick}
        />
      )}
      {Array.isArray(sections) &&
        sections.map(
          (section, index) =>
            tabValue === index + 6 && (
              <HomeSection key={section.id} id={section?.id} />
            )
        )}
    </Box>
  );
};

export default HomeIndex;
