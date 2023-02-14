import { useCallback, useEffect, useState } from "react";
import ClusterPopup from "@/components/UI/ClusterPopup";
import RenderIf from "@/components/UI/Common/RenderIf";
import Drawer from "@/components/UI/Drawer/Drawer";
import FooterBanner from "@/components/UI/FooterBanner/FooterBanner";
import SitesIcon from "@/components/UI/SitesIcon/Icons";
import { MaintenanceError } from "@/errors";
import { dataFetcher } from "@/services/dataFetcher";
import { useMapActions, useDevice } from "@/stores/mapStore";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import Footer from "@/components/UI/Footer/Footer";
import HeadWithMeta from "@/components/base/HeadWithMeta/HeadWithMeta";
import FilterMenu from "@/components/UI/FilterMenu/FilterMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import LocaleSwitch from "@/components/UI/I18n/LocaleSwitch";
import { useURLActions } from "@/stores/urlStore";
import { useGetAreas } from "@/hooks/useGetAreas";
import { locationsURL } from "@/utils/urls";
import { useVerifiedLocations } from "@/hooks/useVerifiedLocations";
import { CHANNEL_COUNT } from "@/utils/constants";
import ScanAreaButton from "@/components/UI/ScanAreaButton/ScanAreaButton";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

type Props = {
  deviceType: DeviceType;
  singleItemDetail: any;
  ahbap: any[];
};

export default function Home({ deviceType, singleItemDetail }: Props) {
  const [isFooterBannerOpen, setIsFooterBannerOpen] = useState<boolean>(false);
  const {
    ahbapLocations,
    hospitalLocations,
    foodLocations,
    teleteyitLocations,
    satelliteLocations,
    sahraKitchenLocations,
    pharmacyLocations,
    errors: verifiedLocationErrors,
  } = useVerifiedLocations();
  const { t } = useTranslation(["common", "home"]);
  const { setTimeStamp } = useURLActions();
  const router = useRouter();
  const device = useDevice();
  const {
    resetThrottling,
    setSendRequest,
    shouldFetchNextOption,
    slowLoading,
    resetShouldFetchNextOption,
    error: getAreasError,
    isLoading,
    isValidating,
  } = useGetAreas();

  const isMobile = device === "mobile";

  const error =
    getAreasError && verifiedLocationErrors.length === CHANNEL_COUNT;
  if (error) {
    throw new MaintenanceError(t("common:errors.maintenance").toString());
  }

  const { setDevice } = useMapActions();

  const handleScanButtonClick = useCallback(() => {
    setSendRequest(true);

    resetThrottling();
  }, [resetThrottling, setSendRequest]);

  useEffect(() => {
    setDevice(deviceType);
  }, [deviceType, setDevice]);

  const onLanguageChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const handleToggleFooterBanner = useCallback(() => {
    setIsFooterBannerOpen(!isFooterBannerOpen);
  }, [isFooterBannerOpen]);

  return (
    <>
      <HeadWithMeta singleItemDetail={singleItemDetail} />
      <main className={styles.main}>
        <div>
          <RenderIf condition={!error}>
            <div
              style={{
                position: "fixed",
                right: "10px",
                top: "15px",
                zIndex: "502",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 2,
                }}
              >
                <FilterMenu>
                  <FilterMenu.Channel />
                  <FilterMenu.Time
                    onChangeTime={setTimeStamp}
                    shouldFetchNextOption={shouldFetchNextOption}
                    resetShouldFetchNextOption={resetShouldFetchNextOption}
                  />
                  <FilterMenu.Reason />
                </FilterMenu>
              </div>
            </div>
            <LeafletMap
              ahbap={ahbapLocations}
              hospital={hospitalLocations}
              food={foodLocations}
              teleteyit={teleteyitLocations}
              satellite={satelliteLocations}
              sahra_kitchen={sahraKitchenLocations}
              pharmacy={pharmacyLocations}
            />
            <div>
              <LocaleSwitch
                current={router.locale || "tr"}
                onChange={onLanguageChange}
                mobile={isMobile}
              />
            </div>
            {!isMobile && <SitesIcon></SitesIcon>}
            <div>
              <ScanAreaButton
                isLoading={isLoading}
                isValidating={isValidating}
                slowLoading={slowLoading}
                handleScanButtonClick={handleScanButtonClick}
              />
            </div>
          </RenderIf>
        </div>
        <Drawer />
        <ClusterPopup />
        <FooterBanner
          open={isFooterBannerOpen}
          onClick={handleToggleFooterBanner}
        />
        <Footer onClick={handleToggleFooterBanner} />
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const UA = context.req.headers["user-agent"];
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  let itemDetail = {};
  if (context.query.id) {
    const url = locationsURL(context.query.id) as string;
    itemDetail = await dataFetcher(url);
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "home"])),
      deviceType: isMobile ? "mobile" : "desktop",
      ahbap: [],
      singleItemDetail: context.query.id
        ? { ...itemDetail, ...context.query }
        : {},
    },
  };
}
