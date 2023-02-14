import type { MouseEvent } from "react";

type FilterMenuButtonProps = {
  // eslint-disable-next-line no-unused-vars
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  children: React.ReactNode;
  ariaControls?: string;
};

const FilterMenuButton: React.FC<FilterMenuButtonProps> = ({
  children,
  onClick,
  open,
  ariaControls,
}) => {
  return (
    <button
      aria-controls={open ? ariaControls : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      // disableElevation
      onClick={onClick}
      // disableFocusRipple
      // disableRipple
      // disableTouchRipple
    >
      {/* KeyboardArrowDownIcon */}
      <svg />
      {children}
    </button>
  );
};

export default FilterMenuButton;
