import { ReactNode, ReactElement } from 'react'

import { NextPage } from 'next';
import App, { AppProps, AppContext } from 'next/app';
import '../styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps} = props;
  return <Component {...pageProps} />
}

export default MyApp
