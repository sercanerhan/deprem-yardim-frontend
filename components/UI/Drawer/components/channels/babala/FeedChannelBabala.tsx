import { FeedChannelBabalaProps } from "../../types";
import { capitalize, isNaN } from "@/utils/helpers";

const FeedChannelBabala = ({
  full_text,
  reason,
  extra_parameters,
}: FeedChannelBabalaProps) => {
  const extraValues =
    extra_parameters &&
    Object.entries(extra_parameters).map(([k, v]) => {
      if (!isNaN(v) && v !== "<nil>" && (typeof v !== "string" || !!v.trim())) {
        return (
          <p key={k} style={styles.fullText}>
            {v}
          </p>
        );
      }
    });

  return (
    <>
      <div style={styles.container}>
        <div style={styles.logo_container}>
          <p style={styles.logo}>Babala</p>
        </div>
        <div> divider </div>
        <p style={styles.fullText}>{full_text}</p>
        {extraValues}

        {!isNaN(reason) && reason && (
          <div style={styles.chip_container}>
            <div color="info"> {capitalize(reason)} </div>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  chip_container: {
    display: "flex",
    gap: 5,
    marginTop: "10px",
    fontWeight: 500,
  },
  logo_container: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  logo: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 800,
  },
  container: {
    padding: "11px 15px 40px 15px",
    margin: "10px 0",
    borderRadius: "12px",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
  },
  fullText: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.35,
    marginTop: 20,
  },
};

export default FeedChannelBabala;
