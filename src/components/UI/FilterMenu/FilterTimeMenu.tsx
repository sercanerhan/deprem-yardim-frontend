import { useEffect, useState } from "react";
import FilterMenuButton from "./FilterMenuButton";
import { useTranslation } from "next-i18next";
import { Menu } from "@headlessui/react";

type TimeOption =
  | "last30Minutes"
  | "last1Hour"
  | "last3Hours"
  | "last6Hours"
  | "last12Hours"
  | "last24Hours"
  | "last3Days"
  | "all";

type FilterOption = {
  label: string;
  inMilliseconds: number;
  value: TimeOption;
};

const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
const DAY_IN_MILLISECONDS = 24 * HOUR_IN_MILLISECONDS;

const FilterOptions: readonly FilterOption[] = [
  {
    label: "lastHalfHour",
    inMilliseconds: (1 * HOUR_IN_MILLISECONDS) / 2,
    value: "last30Minutes",
  },
  {
    label: "lastHour",
    inMilliseconds: 1 * HOUR_IN_MILLISECONDS,
    value: "last1Hour",
  },
  {
    label: "lastThreeHours",
    inMilliseconds: 3 * HOUR_IN_MILLISECONDS,
    value: "last3Hours",
  },
  {
    label: "lastSixHours",
    inMilliseconds: 6 * HOUR_IN_MILLISECONDS,
    value: "last6Hours",
  },
  {
    label: "lastTwelveHours",
    inMilliseconds: 12 * HOUR_IN_MILLISECONDS,
    value: "last12Hours",
  },
  {
    label: "lastDay",
    inMilliseconds: 24 * HOUR_IN_MILLISECONDS,
    value: "last24Hours",
  },
  {
    label: "lastThreeDays",
    inMilliseconds: 3 * DAY_IN_MILLISECONDS,
    value: "last3Days",
  },
  { label: "all", inMilliseconds: -1, value: "all" },
] as const;

const valueToOption = (value: string): FilterOption | undefined => {
  return FilterOptions.find((option) => option.value === value);
};

export type FilterTimeMenuProps = {
  onChangeTime: (_newerThanTimestamp?: number) => void;
  shouldFetchNextOption: Boolean;
  resetShouldFetchNextOption: Function;
};

const FilterTimeMenu: React.FC<FilterTimeMenuProps> = ({
  onChangeTime,
  shouldFetchNextOption,
  resetShouldFetchNextOption,
}) => {
  const { t } = useTranslation("home");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<TimeOption>("last12Hours");
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.dataset.value as TimeOption;

    setSelectedValue(value);

    handleClose();
  };

  useEffect(() => {
    let currentOptionIndex = FilterOptions.findIndex(
      (option) => option.value === selectedValue
    );

    if (shouldFetchNextOption && selectedValue !== "all") {
      setSelectedValue(FilterOptions[currentOptionIndex + 1].value);
      resetShouldFetchNextOption();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchNextOption]);

  useEffect(() => {
    const option = valueToOption(selectedValue);

    if (!option) return;
    if (option.inMilliseconds === -1) {
      onChangeTime(undefined);
    } else {
      const currentTimestampInMillis = Date.now().valueOf();
      const pastTimestampInMillis =
        currentTimestampInMillis - option.inMilliseconds;
      const pastTimestampInSeconds = Math.floor(pastTimestampInMillis / 1000);
      onChangeTime(Math.floor(pastTimestampInSeconds));
    }
  }, [onChangeTime, selectedValue]);

  return (
    <>
      <FilterMenuButton
        ariaControls={"zaman-filtrele"}
        open={open}
        onClick={handleClick}
      >
        {t(
          `filter.time.${
            FilterOptions.find((option) => option.value === selectedValue)
              ?.label
          }`
        )}
      </FilterMenuButton>
      {/* anchorEl={anchorEl} open={open} onClose={handleClose} */}
      <Menu>
        {FilterOptions.map((option) => (
          <button
            key={option.value}
            onClick={handleMenuItemClick}
            data-value={option.value}
            // disableRipple
          >
            {t(`filter.time.${option.label}`)}
          </button>
        ))}
      </Menu>
    </>
  );
};

export default FilterTimeMenu;
