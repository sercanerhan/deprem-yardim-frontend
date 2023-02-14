import styles from "./LayerButton.module.css";

type LayerButtonProps = {
  onClick: () => void;
  image: string;
  title: string;
  checked: boolean;
};

export const LayerButton = ({
  onClick,
  image,
  title,
  checked,
}: LayerButtonProps) => {
  return (
    <button
      onClick={onClick}
      defaultChecked={checked}
      style={{
        flex: 1,
        border: "none",
        background: "transparent",
        display: "block",
        maxWidth: "33%",
      }}
    >
      <div
        className={styles.buttonImage}
        style={{
          borderColor: checked ? "teal" : "transparent",
          backgroundImage: `url(/images/${image}.png)`,
        }}
      />
      <p>{title}</p>
    </button>
  );
};
