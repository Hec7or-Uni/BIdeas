import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <SessionProvider
      session={session}
      refetchInterval={5 * 60} // Re-fetch session every 5 minutes
    >
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
