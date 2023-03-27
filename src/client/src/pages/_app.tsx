import { lodingEnd, lodingStart } from '@/components/communal/ProgressBar';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Router } from 'next/router';
import React from 'react';
import 'tdesign-react/es/style/index.css';
if (!process.browser) React.useLayoutEffect = React.useEffect;

Router.events.on('routeChangeStart', () => { lodingStart() })
Router.events.on('routeChangeComplete', () => { lodingEnd() })

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
