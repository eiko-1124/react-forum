import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import 'tdesign-react/es/style/index.css';
if (!process.browser) React.useLayoutEffect = React.useEffect;

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
