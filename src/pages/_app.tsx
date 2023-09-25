import { EffectorNext } from "@effector/next";
import type { AppProps } from "next/app";

import { Fonts } from "@/shared/fonts";
import "@/shared/styles/index.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EffectorNext values={pageProps?.values}>
      <Fonts />
      <Component {...pageProps} />
    </EffectorNext>
  );
}
