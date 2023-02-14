import { useEffect, useState } from "react";

import { useSnackbar } from "@/components/base/Snackbar";
// import { useWindowSize } from "@/hooks/useWindowSize";
import { useMapActions, usePopUpData } from "@/stores/mapStore";
import formatcoords from "formatcoords";
import { CopyButton } from "../Button/CopyButton";
import { useTranslation } from "next-i18next";
import {
  generateGoogleMapsUrl,
  mapsButtons,
} from "../Drawer/components/MapButtons";
import { findTagByClusterCount } from "../Tag/Tag.types";
import useDisableZoom from "@/hooks/useDisableZoom";

const ClusterPopup = () => {
  const { t } = useTranslation("home");
  useDisableZoom();
  const { setPopUpData } = useMapActions();
  const { enqueueInfo, closeSnackbar } = useSnackbar();
  // const windowSize = useWindowSize();

  const [copyButtonClicked, setCopyButtonClicked] = useState<boolean>(false);

  const data = usePopUpData();
  const lat = data?.baseMarker.geometry.location.lat ?? 0;
  const lng = data?.baseMarker.geometry.location.lng ?? 0;
  const tag = findTagByClusterCount(data?.count ?? 0);

  useEffect(() => {
    if (copyButtonClicked) {
      enqueueInfo(t("cluster.actions.copied").toString());
      setCopyButtonClicked(false);
      setTimeout(() => {
        closeSnackbar();
      }, 3000);
    }
  }, [copyButtonClicked, enqueueInfo, closeSnackbar, t]);

  if (!data) return null;

  return (
    <div className="absolute bottom-8 left-2 cursor-pointer z-[1000] text-lg border ">
      <div>
        <div>
          <div>
            <div>
              <p>{t("cluster.noticeCount", { count: data?.count ?? 0 })}</p>
              <button>{t(`tags.${tag.intensity}`)}</button>
            </div>
          </div>
          <p>
            <div aria-label="close" onClick={() => setPopUpData(null)}>
              {/* close */}
              <svg fontSize="small" />
            </div>
          </p>
        </div>
        <p>{formatcoords([lat, lng]).format()}</p>
        <div>
          <div>
            <div>
              {mapsButtons.slice(0, 2).map((button) => (
                <button
                  key={t(`cluster.mapButtons.${button.label}`).toString()}
                  onClick={() => button.urlCallback(lat, lng)}
                >
                  {button.icon}
                  <p>{t(`cluster.mapButtons.${button.label}`)}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div>
              {mapsButtons.slice(2).map((button) => (
                <button
                  key={button.label}
                  onClick={() => button.urlCallback(lat, lng)}
                >
                  {button.icon}
                  <p>{t(`cluster.mapButtons.${button.label}`)}</p>
                </button>
              ))}
              <CopyButton
                data={generateGoogleMapsUrl(lat, lng)}
                onClick={() => setCopyButtonClicked(true)}
                title={t("cluster.mapButtons.copy").toString()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClusterPopup;
