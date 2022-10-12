import { ReactNode, ReactElement } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import App, { AppProps, AppContext } from 'next/app';

import '../styles/globals.css';
import { AuthProvider } from 'src/contexts/JWTContext';
import ThemeSettings from '../components/settings';
import ThemeProvider from '../theme';
import { SettingsValueProps } from '../components/settings/types';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  settings: SettingsValueProps;
  Component: NextPageWithLayout;
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
