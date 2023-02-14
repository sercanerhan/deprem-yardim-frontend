import styles from "@/styles/Home.module.css";
import LocaleSwitch, { LocaleSwitchProps } from "../I18n/LocaleSwitch";
import { ChannelFilterMenu } from "./ChannelFilterMenu";
import { ReasonFilterMenu } from "./ReasonFilterMenu";
import TimeFilterMenu, { FilterTimeMenuProps } from "./FilterTimeMenu";
import { useTranslation } from "next-i18next";

type FilterMenuProps = {
  children: React.ReactNode;
};

type FilterMenuType = React.FC<FilterMenuProps> & {
  Time: React.FC<FilterTimeMenuProps>;
  Channel: React.FC;
  Reason: React.FC;
  LocaleSwitch: React.FC<LocaleSwitchProps>;
};

const FilterMenu: FilterMenuType = ({ children }) => {
  const { t } = useTranslation("home");
  return (
    <div>
      <div className={styles.filterMenu}>
        <span>{t("filter.title")}</span>
        {children}
      </div>
    </div>
  );
};
FilterMenu.Time = TimeFilterMenu;
FilterMenu.Channel = ChannelFilterMenu;
FilterMenu.LocaleSwitch = LocaleSwitch;
FilterMenu.Reason = ReasonFilterMenu;

export default FilterMenu;
