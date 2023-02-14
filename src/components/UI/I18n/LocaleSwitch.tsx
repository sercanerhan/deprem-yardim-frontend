/* eslint-disable no-unused-vars */
import { useState } from "react";
import FilterMenuButton from "@/components/UI/FilterMenu/FilterMenuButton";

import { Menu } from "@headlessui/react";

type Language = {
  locale: string;
  text: string;
};

const languages: Language[] = [
  {
    locale: "en",
    text: "EN",
  },
  {
    locale: "tr",
    text: "TR",
  },
];

export type LocaleSwitchProps = {
  current: string;

  // eslint-disable-next-line no-unused-vars
  onChange: (locale: string) => void;
  mobile?: boolean;
};

const LocaleSwitch: React.FC<LocaleSwitchProps> = ({
  current,
  onChange,
  mobile = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (language: Language) => () => {
    onChange(language.locale);
    handleClose();
  };

  return (
    <>
      <FilterMenuButton
        ariaControls="locale-menu"
        open={open}
        onClick={handleClick}
      >
        {/* HighlightOffIcon */}
        <svg></svg>
        &nbsp;&nbsp;
        {languages.find((language) => language.locale === current)?.text}
      </FilterMenuButton>
      {/*  anchorEl={anchorEl} open={open} onClose={handleClose} */}
      <Menu>
        <Menu.Items>
          {languages.map((language) => (
            // onClick={handleMenuItemClick(language)}
            // data-value={language.locale}
            // disableRipple
            <Menu.Item key={language.locale}>{language.text}</Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </>
  );
};

export default LocaleSwitch;
