import { MarkerData } from "@/mocks/types";
import { useMapActions } from "@/stores/mapStore";
import { Trans, useTranslation } from "next-i18next";
import {
  AhbapData,
  PharmacyData,
  SahraKitchenData,
  SatelliteData,
  TeleteyitData,
} from "./types";

type Props = {
  drawerData:
    | MarkerData
    | AhbapData
    | TeleteyitData
    | SatelliteData
    | SahraKitchenData
    | PharmacyData
    | null;
};

export const CloseByRecord = ({ drawerData }: Props) => {
  const { setDrawerData } = useMapActions();
  const { t } = useTranslation("home");
  if (
    !drawerData ||
    !("closeByRecords" in drawerData) ||
    !drawerData.closeByRecords ||
    drawerData.closeByRecords.length <= 1
  )
    return null;
  const onClick = (reference: number) => () => {
    const tempDrawerData: MarkerData | AhbapData = {
      ...drawerData,
      isVisited: true,
      reference,
      closeByRecords: drawerData.closeByRecords,
    };
    setDrawerData(tempDrawerData);
  };
  return (
    <div>
      <p>{t("content.closeBy.title")}</p>
      <p>
        <Trans
          i18nKey="home:content.closeBy.details"
          components={{ b: <b /> }}
        />
      </p>
      {drawerData.closeByRecords.map((record) => (
        <button
          // variant={record === drawerData.reference ? "contained" : "outlined"}
          onClick={onClick(record)}
          key={record}
        >
          ID: {record}
        </button>
      ))}
    </div>
  );
};
