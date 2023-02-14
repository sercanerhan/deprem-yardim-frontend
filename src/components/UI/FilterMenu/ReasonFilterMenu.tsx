import { useURLActions } from "@/stores/urlStore";
import * as React from "react";
// import { useTranslation } from "next-i18next";

import { Listbox } from "@headlessui/react";

const reasonFilterMenuOptions: string[] = [
  "barinma",
  "elektronik",
  "enkaz",
  "erzak",
  "guvenli-noktalar",
  "hayvanlar-icin-tedavi",
  "giysi",
  "konaklama",
  "kurtarma",
  "lojistik",
  "su",
  "yagma",
  "yemek",
];

export const ReasonFilterMenu: React.FC = () => {
  // const { t } = useTranslation("home");

  const { setReasoningFilterMenuOption } = useURLActions();
  const [filterValues, setValues] = React.useState<string[]>(
    reasonFilterMenuOptions
  );

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const selectedReasons =
      typeof value === "string" ? value.split(",") : value;

    setValues(selectedReasons);
  };

  React.useEffect(() => {
    setReasoningFilterMenuOption(filterValues.join(","));
  }, [filterValues, setReasoningFilterMenuOption]);

  return (
    <Listbox
      multiple
      // renderValue={(selected) =>
      //   selected
      //     .map((val: any) => t(`filter.reasons.${val}`).toLocaleUpperCase())
      //     .join(", ")
      // }
      value={filterValues}
      onChange={handleChange}
    >
      {reasonFilterMenuOptions.map((item, i) => (
        //          value={item}
        <div key={i}>
          <input type="checkbox" checked={filterValues.indexOf(item) > -1} />

          <p
          // disableTypography

          // primary={t(`filter.reasons.${item}`).toLocaleUpperCase()}
          />
        </div>
      ))}
    </Listbox>
  );
};
