import useSWR from "swr";
import formatcoords from "formatcoords";
import { dataTransformer } from "@/utils/dataTransformer";
import { getTimeAgo } from "@/utils/date";
// import { useWindowSize } from "@/hooks/useWindowSize";
import { useMapClickHandlers } from "@/hooks/useMapClickHandlers";
import { locationsURL } from "@/utils/urls";
import { dataFetcher } from "@/services/dataFetcher";
import styles from "../Drawer.module.css";
import FeedContent from "./channels/FeedContent";
import GenericError from "../../GenericError/GenericError";
import MapButtons, { generateGoogleMapsUrl } from "./MapButtons";
import { useTranslation } from "next-i18next";
import {
  AhbapData,
  TeleteyitData,
  SatelliteData,
  SahraKitchenData,
  PharmacyData,
} from "./types";
import { CloseByRecord } from "./OtherRecordsInSameLocation";
import { useRouter } from "next/router";

export interface ContentProps {
  // eslint-disable-next-line no-unused-vars
  onCopyBillboard: (clipped: string) => void;
  drawerData:
    | MarkerData
    | AhbapData
    | TeleteyitData
    | SatelliteData
    | SahraKitchenData
    | PharmacyData
    | null;
}

export const Content = ({ drawerData, onCopyBillboard }: ContentProps) => {
  const { t } = useTranslation("home");
  const {
    data: rawData,
    isLoading,
    error,
  } = useSWR<Data | undefined>(
    locationsURL(drawerData?.reference),
    dataFetcher
  );
  const data = dataTransformer(rawData);
  // const size = useWindowSize();
  const { handleMarkerClick: toggler } = useMapClickHandlers();
  const router = useRouter();
  const locale = router.locale;

  if (!drawerData) {
    return null;
  }

  const formattedCoordinates = formatcoords([
    drawerData.geometry.location.lat,
    drawerData.geometry.location.lng,
  ]).format();

  const formattedTimeAgo = rawData && getTimeAgo(rawData.timestamp, locale);

  const hasSource =
    data &&
    data.channel === "twitter" &&
    // @ts-ignore gelecek veri twitter verisi ise tweet_id her türlü geliyor, TS tanıyamadığı için kızıyor buralarda
    data.extra_parameters?.tweet_id &&
    // @ts-ignore
    data.extra_parameters?.tweet_id !== "";

  const title = data?.formatted_address ?? (drawerData as any).properties?.name;

  // @ts-ignore
  return (
    <div role="presentation" onKeyDown={(e) => toggler(e)}>
      {isLoading && (
        <div>
          {/* Circular Progress */}
          <div />
        </div>
      )}
      {error && <GenericError />}
      {!isLoading && (
        <div className={styles.content}>
          {drawerData.reference && (
            <span className={styles.contentIdSection}>
              ID: {drawerData.reference}
            </span>
          )}
          {title && <h3 style={{ maxWidth: "45ch" }}>{title}</h3>}
          {formattedTimeAgo && (
            <div className={styles.contentInfo}>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="#111111">
                <path d="M8.2 1.3c-3.7 0-6.7 3-6.7 6.7s3 6.7 6.7 6.7 6.7-3 6.6-6.7-3-6.7-6.6-6.7zM12 8.7h-4.5V4h1.3v3.3H12v1.4z" />
              </svg>
              <span>
                {t("content.notifyTime")}: {formattedTimeAgo}
              </span>
            </div>
          )}
          <div className={styles.contentInfo}>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="#111111">
              <path d="M8 1A5.5 5.5 0 0 0 2.5 6.5a5.4 5.4 0 0 0 1.1 3.3s0.1 0.2 0.2 0.2L8 15l4.2-5c0 0 0.2-0.2 0.2-0.2l0 0A5.4 5.4 0 0 0 13.5 6.5 5.5 5.5 0 0 0 8 1Zm0 7.5a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z" />
              <path d="M8 6.5m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" fill="none" />
            </svg>
            <span>{formattedCoordinates}</span>
          </div>
          <MapButtons drawerData={drawerData} />
          <div>
            <input
              value={generateGoogleMapsUrl(
                drawerData.geometry.location.lat,
                drawerData.geometry.location.lng
              )}
            />
            <div className={styles.actionButtons}>
              <div
                onClick={() =>
                  onCopyBillboard(
                    `https://www.google.com/maps/@${drawerData.geometry.location.lat.toString()},${drawerData.geometry.location.lng.toString()},22z`
                  )
                }
              >
                {t("cluster.mapButtons.copy")}
              </div>
              {hasSource && (
                <div
                  onClick={() =>
                    window.open(
                      // @ts-ignore: tweet_id generic olmadığı için kızıyor, type ile fixlenebilir
                      `https://twitter.com/anyuser/status/${data.extra_parameters?.tweet_id}`
                    )
                  }
                >
                  {t("content.source")}
                </div>
              )}
            </div>
          </div>

          {(data ||
            (drawerData as AhbapData).channel === "ahbap" ||
            (drawerData as TeleteyitData).channel === "teleteyit" ||
            (drawerData as SatelliteData).channel === "uydu" ||
            (drawerData as SahraKitchenData).channel === "sahra_mutfak" ||
            (drawerData as PharmacyData).channel === "eczane_excel") && (
            <FeedContent content={data ?? (drawerData as AhbapData)} />
          )}
        </div>
      )}

      <CloseByRecord drawerData={drawerData} />

      {/* Close */}
      <svg onClick={(e) => toggler(e)} className={styles.closeButton} />
    </div>
  );
};
