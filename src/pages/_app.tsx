import "@/styles/global.css";
import ErrorBoundary from "@/components/base/ErrorBoundary";
import { getCookie, setCookie } from "@/utils/cookie";

import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import createEmotionCache from "../utils/createEmotionCache";
import { appWithTranslation } from "next-i18next";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    const localeCookie = getCookie("NEXT_LOCALE");
    if (router.locale && localeCookie !== router.locale) {
      setCookie("NEXT_LOCALE", router.locale, "/", 24 * 7);
    }
  }, [router.locale]);

  return (
    <ErrorBoundary>
      <CacheProvider value={emotionCache}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <Component {...pageProps} />
      </CacheProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(MyApp);
