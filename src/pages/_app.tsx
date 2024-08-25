import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { trpc } from "@/shared/api";
import { getSession, GetSessionParams, SessionProvider } from "next-auth/react";
import { NavBar } from "@/shared/ui";

function App({ Component, pageProps }: AppProps) {
    return <SessionProvider session={pageProps.session}>
        <NavBar />
        <Component {...pageProps} />
    </SessionProvider>;
}


type getInitialProps = {
    ctx: GetSessionParams | undefined
}

App.getInitialProps = async ({ ctx }: getInitialProps) => {
    const session = await getSession(ctx)

    return {
        pageProps: {
            session
        },
    }
}

export default trpc.withTRPC(App)