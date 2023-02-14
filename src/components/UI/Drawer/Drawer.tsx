/* eslint-disable no-unused-vars */
import useDisableZoom from "@/hooks/useDisableZoom";
import { useMapClickHandlers } from "@/hooks/useMapClickHandlers";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useDrawerData, useIsDrawerOpen } from "@/stores/mapStore";
import { memo, MouseEvent, useCallback, useEffect, useMemo } from "react";
import styles from "./Drawer.module.css";
import { useUrlPath } from "@/hooks/useUrlPath";
import { useRouter } from "next/router";
import { Content } from "./components/Content";
import { LayerContent } from "./components/LayerContent";
import { useTranslation } from "next-i18next";

const Drawer = () => {
  useDisableZoom();
  const isOpen = useIsDrawerOpen();
  const drawerData = useDrawerData();
  const router = useRouter();
  const { setUrlQuery } = useUrlPath();
  const size = useWindowSize();
  const { t } = useTranslation("home");

  function copyBillboard(url: string) {
    navigator.clipboard.writeText(url);
  }

  const { handleMarkerClick: toggler } = useMapClickHandlers();

  useEffect(() => {
    const id = isOpen ? drawerData?.reference : undefined;
    if (router && drawerData) {
      const path = setUrlQuery({ id }, router);
      const query = path;
      router.push({ query }, { query }, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, drawerData]);

  return (
    <div>
      <div
        className={styles.drawer}
        // anchor={anchor}
        // open={isOpen}
        // onClose={handleClose}
        // data-is-layer-drawer={!drawerData}
      >
        {!!drawerData && (
          <Content drawerData={drawerData} onCopyBillboard={copyBillboard} />
        )}
        {!drawerData && <LayerContent />}
      </div>
    </div>
  );
};

export default memo(Drawer);
