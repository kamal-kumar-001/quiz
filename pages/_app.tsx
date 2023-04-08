import '@/styles/globals.css'
import { ThemeProvider } from "next-themes";
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from "next-auth/react"
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}
