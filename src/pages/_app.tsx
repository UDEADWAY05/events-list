import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { trpc } from "@/shared/api";
import { getSession, SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps) {
    return <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
    </SessionProvider>;
}

App.getInitialProps = async ({ ctx }) => {
    const session = await getSession(ctx)

    return {
        pageProps: {
            session
        },
    }
}

export default trpc.withTRPC(App)