import React, { useState } from "react";
import { Switch, FormControlLabel, Tooltip } from "@mui/material";
import Loader from "components/shared/Loader";
import { useDeleteRegions } from "hooks/regions/useDeleteRegions";
import { useRegions } from "hooks/regions/useRegions";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";

const RegionStatusSwitch = ({ id, page, count, status }) => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(status === "enabled"); // or use boolean true/false depending on your API

  const deleteregions = useDeleteRegions({ page, count });
  const { refetch } = useRegions();
  const { direction } = settingsStore();

  const handleToggle = () => {
    const newStatus = !enabled;
    setEnabled(newStatus);
    setLoading(true);

    // Using same delete mutation, but you could adapt it to enable/disable instead.
    deleteregions.mutate(id, {
      onSuccess: () => {
        refetch();
        setLoading(false);
      },
      onError: () => {
        // revert on failure
        setEnabled(!newStatus);
        setLoading(false);
      },
    });
  };

  return (
    <Tooltip
      title={
        direction === "ltr"
          ? enabled
            ? "Disable region"
            : "Enable region"
          : enabled
          ? "تعطيل المنطقة"
          : "تفعيل المنطقة"
      }
    >
      <FormControlLabel
        control={
          loading ? (
            <Loader size={24} />
          ) : (
            <Switch
              color="primary"
              checked={enabled}
              onChange={handleToggle}
              disabled={loading}
            />
          )
        }
        label={enabled ? t("Enabled") : t("Disabled")}
      />
    </Tooltip>
  );
};

export default RegionStatusSwitch;
