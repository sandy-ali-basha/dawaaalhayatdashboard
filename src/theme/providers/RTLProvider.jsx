import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { settingsStore } from "../../store/settingsStore";
import { useEffect } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const cacheRtl = createCache({
  key: "mui-rtl",
  prepend: true,
  stylisPlugins: [prefixer, rtlPlugin],
});

export const RTLProvider = ({ children }) => {
  const direction = settingsStore((state) => state.direction);

  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  if (direction === "rtl") {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  }

  return <>{children}</>;
};
