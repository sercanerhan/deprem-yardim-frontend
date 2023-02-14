import useSnackbarHook from "@/components/base/Snackbar/useSnackbar";
import { useTranslation } from "next-i18next";
import { useCallback, useState } from "react";
import { FeedChannelTwitterProps } from "../../types";
import EmbedTweet from "./EmbedTweet";
import styles from "./FeedChannelTwitter.module.css";
import PlaceholderTweet from "./PlaceholderTweet";

import { CopyAll } from "@mui/icons-material";

import { Switch } from "@headlessui/react";

const FeedChannelTwitter = ({
  reason,
  full_text,
  extra_parameters,
}: FeedChannelTwitterProps) => {
  const { t } = useTranslation("home");
  const [showSavedData, setShowSavedData] = useState(true);
  const { enqueueInfo } = useSnackbarHook();

  const handleClickCopyFullText = useCallback(() => {
    navigator.clipboard.writeText(full_text as string);
    enqueueInfo(t("cluster.copiedContentSuccessfully"));
  }, [full_text, t, enqueueInfo]);

  return (
    <div className={styles.sourceContent}>
      <div className={styles.sourceHelpContent}>
        <p className={styles.sourceContentTitle}>{t("content.helpContent")}</p>

        {extra_parameters && extra_parameters.name && (
          <div className={styles.sourceContentSwitch}>
            <p> {t("content.showData")}</p>
            <Switch
              checked={showSavedData}
              onChange={() => setShowSavedData((s) => !s)}
            />
          </div>
        )}
      </div>
      {showSavedData ? (
        <PlaceholderTweet
          reason={reason || ""}
          source={extra_parameters!}
          full_text={full_text}
        />
      ) : (
        <EmbedTweet reason={reason || ""} source={extra_parameters!} />
      )}
      {!!full_text && (
        <button onClick={handleClickCopyFullText}>
          <CopyAll className={styles.btnIcon} />

          {t("cluster.copyFullText")}
        </button>
      )}
    </div>
  );
};

export default FeedChannelTwitter;
