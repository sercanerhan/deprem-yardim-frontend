import CloseIcon from "@mui/icons-material/Close";
import styles from "../Drawer.module.css";
import { useTranslation } from "next-i18next";
import {
  MapLayer,
  MapType,
  useMapActions,
  useMapLayers,
  useMapType,
} from "@/stores/mapStore";
import { LayerButton } from "../../Button/LayerButton";

export const LayerContent = () => {
  const { t } = useTranslation("home");
  const mapLayers = useMapLayers();
  const mapType = useMapType();
  const { toggleDrawer, toggleMapLayer, setMapType } = useMapActions();
  const close = () => toggleDrawer();
  return (
    <div className={styles.layerContent} role="presentation">
      <div>
        <CloseIcon onClick={close} className={styles.closeButton} />
        <p>{t("map.type")}</p>
        <div>
          <LayerButton
            onClick={() => setMapType(MapType.Default)}
            image="default"
            checked={mapType === MapType.Default}
            title={t("map.base.default")}
          />
          <LayerButton
            onClick={() => setMapType(MapType.Satellite)}
            image="satellite"
            checked={mapType === MapType.Satellite}
            title={t("map.base.satellite")}
          />
          <LayerButton
            onClick={() => setMapType(MapType.Terrain)}
            image="terrain"
            checked={mapType === MapType.Terrain}
            title={t("map.base.terrain")}
          />
        </div>
        <p>{t("map.details")}</p>
        <div>
          <LayerButton
            onClick={() => toggleMapLayer(MapLayer.Markers)}
            image="markers"
            checked={mapLayers.includes(MapLayer.Markers)}
            title={t("map.layer.markers")}
          />
          <LayerButton
            onClick={() => toggleMapLayer(MapLayer.Heatmap)}
            image="heatmap"
            checked={mapLayers.includes(MapLayer.Heatmap)}
            title={t("map.layer.heatmap")}
          />
          <LayerButton
            onClick={() => toggleMapLayer(MapLayer.Ahbap)}
            image="ahbap"
            checked={mapLayers.includes(MapLayer.Ahbap)}
            title={t("map.layer.ahbap")}
          />
          <LayerButton
            onClick={() => toggleMapLayer(MapLayer.Hospital)}
            image="hospitals"
            checked={mapLayers.includes(MapLayer.Hospital)}
            title={t("map.layer.health")}
          />
          <LayerButton
            onClick={() => toggleMapLayer(MapLayer.Food)}
            image="food"
            checked={mapLayers.includes(MapLayer.Food)}
            title={t("map.layer.food")}
          />
          <LayerButton
            onClick={() => toggleMapLayer(MapLayer.Teleteyit)}
            image="teleteyit"
            checked={mapLayers.includes(MapLayer.Teleteyit)}
            title={t("map.layer.teleteyit")}
          />
          <LayerButton
            onClick={() => toggleMapLayer(MapLayer.Satellite)}
            image="uydu"
            checked={mapLayers.includes(MapLayer.Satellite)}
            title={t("map.layer.satellite")}
          />
          <LayerButton
            onClick={() => toggleMapLayer(MapLayer.SahraMutfak)}
            image="sahra-mutfak"
            checked={mapLayers.includes(MapLayer.SahraMutfak)}
            title={t("map.layer.sahra_mutfak")}
          />
          <LayerButton
            onClick={() => toggleMapLayer(MapLayer.Pharmacy)}
            image="eczane"
            checked={mapLayers.includes(MapLayer.Pharmacy)}
            title={t("map.layer.pharmacy")}
          />
        </div>
      </div>
    </div>
  );
};
