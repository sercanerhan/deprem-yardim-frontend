/* eslint-disable no-unused-vars */
import Link from "next/link";
import { useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import styles from "./Icons.module.css";
import { Popover } from "@headlessui/react";

const sites = [
  {
    href: "https://depremyardim.com/",
    name: "depremYardim",
    icon: "/icons/depremyardımIcon.svg",
    alt: "deprem yardim icon",
    popOverText: "site.depremyardim",
  },
  {
    href: "https://www.afetbilgi.com/",
    name: "afetBilgi",
    icon: "/icons/afetBilgiIcon.svg",
    alt: "afet bilgi icon",
    popOverText: "site.afetbilgi",
  },
  {
    href: "https://deprem.io/",
    name: "depremIO",
    icon: "/icons/depremIOIcon.svg",
    alt: "deprem io icon",
    popOverText: "site.depremio",
  },
];

const SitesIcon = () => {
  const { t } = useTranslation("common");
  // const isMinWidth = useMediaQuery("(min-width:1024px)");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<any>(null);
  const anchor = useRef(null);
  const handlePopoverOpen = (Popover: string) => {
    const element = anchor;
    setAnchorEl(element.current);
    setIsOpen(Popover);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsOpen(null);
  };

  return (
    <div ref={anchor} id="sitesIcon" className={styles.wrapper}>
      {sites.map((site) => (
        <div key={site.name}>
          <Link
            href={site.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handlePopoverOpen(site.name)}
            onMouseLeave={handlePopoverClose}
          >
            <img alt={site.alt} src={site.icon} />
          </Link>
          <Popover
          // anchorReference="anchorEl"
          // anchorEl={anchorEl}
          // open={site.name === isOpen ? true : false}
          // anchorOrigin={{
          //   vertical: "bottom",
          //   horizontal: "left",
          // }}
          // transformOrigin={{
          //   vertical: "top",
          //   horizontal: "right",
          // }}
          // onClose={handlePopoverClose}
          >
            <p>{t(site.popOverText)}</p>
          </Popover>
        </div>
      ))}
    </div>
  );
};

export default SitesIcon;
