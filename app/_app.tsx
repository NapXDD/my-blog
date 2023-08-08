import { AppProps } from "next/app";
import { StrictMode } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Component {...pageProps} />
    </StrictMode>
  );
}
