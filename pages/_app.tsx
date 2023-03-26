import '@/styles/globals.css'
import { ThemeProvider } from "next-themes";
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
    <Component {...pageProps} />
  </ThemeProvider>
    )
}
