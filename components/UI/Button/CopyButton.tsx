import React from "react";

import { useWindowSize } from "@/hooks/useWindowSize";
import FileCopyIcon from "@mui/icons-material/FileCopy";

function copyBillboard(url: string) {
  navigator.clipboard.writeText(url);
}

export function CopyButton({ data, title, onClick, iconProps, ...props }: any) {
  const windowSize = useWindowSize();

  const handleCopyButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    copyBillboard(data);
    onClick?.(event);
  };
  return (
    <button {...props} onClick={handleCopyButtonClick}>
      aa
      <FileCopyIcon fontSize="small" {...iconProps} />
      {title && windowSize.width < 600 && <p>{title}</p>}
    </button>
  );
}
