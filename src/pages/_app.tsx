import "../styles/globals.css";
import theme from "../utils/theme";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import type { AppContext, AppProps } from "next/app";
import { useEffect } from "react";
import { SSRKeycloakProvider, SSRCookies } from "@react-keycloak/ssr";
import { KEYCLOAK_PUBLIC_CONFIG } from "@/utils/auth";
import { parseCookies } from "@/utils/cookies";

export default function App({
  Component,
  pageProps,
  cookies,
}: AppProps & { cookies: any }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <SSRKeycloakProvider
      keycloakConfig={KEYCLOAK_PUBLIC_CONFIG}
      persistor={SSRCookies(cookies)}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SSRKeycloakProvider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  return {
    cookies: parseCookies(appContext.ctx.req),
  };
};
