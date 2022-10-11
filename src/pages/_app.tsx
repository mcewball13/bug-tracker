import { ReactNode, ReactElement } from "react";

import Head from "next/head";
import { NextPage } from "next";
import App, { AppProps, AppContext } from "next/app";
import "../styles/globals.css";
import { AuthProvider } from "src/contexts/JWTContext";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
    Component: NextPageWithLayout;
}

function MyApp(props: MyAppProps) {
    const { Component, pageProps } = props;
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    );
}

export default MyApp;
