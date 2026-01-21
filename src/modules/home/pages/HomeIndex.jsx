import React, { useEffect, useState } from "react";
import { Box, Typography, Skeleton, Button } from "@mui/material";
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
import SortHomeSectionsDialog from "../components/SortHomeSectionsDialog";

const HomeIndex = () => {
  const { data, isLoading } = useHome();
  const queryClient = useQueryClient();
  const [direction] = settingsStore((state) => [state.direction]);
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const [HomePagesections, setHomePagesections] = useState([]);

  const [editSection, setEditSection] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    _Home
      .getSortableSections()
      .then((res) => {
        setSections(res || []);
        console.log("Fetched sections:", res);
      })
      .catch((err) => {
        console.error("Failed to fetch sections:", err);
      });

    _Home
      .getAllSections()
      .then((res) => {
        setHomePagesections(res?.home_sections || []);
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
    <Box>
      {renderUpdateModal()}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold" color="primary">
          Home Page Management
        </Typography>

        <Button variant="outlined" onClick={() => setSortOpen(true)}>
          Sort Sections
        </Button>
      </Box>

      <SortHomeSectionsDialog
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        sections={sections}
        onSaved={() => {
          queryClient.invalidateQueries("home");
          _Home
            .getSortableSections()
            .then((res) => setSections(res || []));
        }}
      />

      <TabsNavigation
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        sections={HomePagesections}
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
      {Array.isArray(HomePagesections) &&
        HomePagesections.map(
          (section, index) =>
            tabValue === index + 6 && (
              <HomeSection key={section.id} id={section?.id} />
            )
        )}
    </Box>
  );
};

export default HomeIndex;
