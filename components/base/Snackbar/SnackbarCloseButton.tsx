import { SnackbarKey } from "notistack";
import React, { useCallback } from "react";
import useSnackbarHook from "./useSnackbar";

type SnackbarCloseButtonProps = {
  key: SnackbarKey;
};

const SnackbarCloseButton: React.FC<SnackbarCloseButtonProps> = ({ key }) => {
  const { closeSnackbar } = useSnackbarHook();

  const handleClick = useCallback(() => {
    closeSnackbar(key);
  }, [closeSnackbar, key]);

  return (
    <div onClick={handleClick}>
      {/* // Close */}
      <svg />
    </div>
  );
};

export default SnackbarCloseButton;
