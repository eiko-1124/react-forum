import { lodingEnd, lodingStart } from '@/components/communal/ProgressBar';
import socket from '@/core/socket/socket';
import { getCookie } from '@/core/utils';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Router } from 'next/router';
import React from 'react';
import 'tdesign-react/es/style/index.css';
if (!process.browser) React.useLayoutEffect = React.useEffect;
import jwt from "jsonwebtoken";

Router.events.on('routeChangeStart', () => { lodingStart() })
Router.events.on('routeChangeComplete', () => { lodingEnd() })

export default function App({ Component, pageProps }: AppProps) {

  socket.connect()
  const token = getCookie('token')
  let id: string = ''
  if (token) id = jwt.decode(token)['id']
  socket.emit('setId', id)

  return <Component {...pageProps} />
}
