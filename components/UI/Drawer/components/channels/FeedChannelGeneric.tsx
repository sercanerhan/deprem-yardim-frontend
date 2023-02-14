import { BaseFeedChannel } from "../types";

const FeedChannelGeneric = ({ full_text }: BaseFeedChannel<any>) => {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.user}></div>
        <p style={styles.fullText}>{full_text}</p>
      </div>
    </>
  );
};

// TODO#642: Herhangi bir channeldan gelmeyen veriler için gösterilecek tasarım
const styles = {
  container: {
    padding: "11px 15px 15px 15px",
    border: "1px solid rgb(207, 217, 222)",
    borderRadius: "12px",
    margin: "10px 0",
  },
  user: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 11,
  },
  fullText: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    color: "rgba(0, 0, 0, 0.87)",
    lineHeight: 1.35,
  },
};

export default FeedChannelGeneric;
