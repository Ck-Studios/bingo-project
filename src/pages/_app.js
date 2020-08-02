import React, {useState, useEffect} from "react";
import Head from "next/head";
import "swiper/css/swiper.css";
import "react-responsive-modal/styles.css";
import {AnimatePresence} from "framer-motion";
import {ApolloProvider} from "@apollo/react-hooks";
import {useApolloClient} from "@apollo/react-hooks";
import {useStore} from "client/store";
import {Provider} from "react-redux";
import {useApollo} from "client/client";

const isProduction = process.env.NODE_ENV === "production";

export default function App({Component, pageProps, router, status}) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Head>
        <title>빙고링</title>
        <link href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css' rel='stylesheet' type='text/css'/>
        <script type="text/javascript" src="/static/scripts/kakao_sdk.js"/>
        <script type="text/javascript">
          Kakao.init('e81eae6e644074fa4932b6658d4c5883');
        </script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-166051021-1"></script>
        <script type="text/javascript" src="static/scripts/ga_sdk.js"/>


      </Head>
      <>
        <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous"
                src="https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v7.0&appId=1015774698842581&autoLogAppEvents=1"
                nonce="k6ZAZVnK">
        </script>

        <Provider store={store}>
          <ApolloProvider client={apolloClient}>
            <AnimatePresence exitBeforeEnter>
              <Component
                {...pageProps}
                key={router.route}
              />
            </AnimatePresence>
          </ApolloProvider>
        </Provider>
      </>
      <style global jsx>
        {`
        @font-face { font-family: 'NanumSquareRound'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff'); font-weight: normal; font-style: normal; }
            body {
                width: 100%;
                min-height: 100%;
                margin: 0;
                background: #f5f5f5;
            }
            
            html {
                box-sizing: border-box;
                height: 100%;
                font-size: 16px;
            }
            
            #__next {
              max-width: 540px !important;
              height: 100%;
              margin: 0 auto;
            }
            
            * { font-family: 'Spoqa Han Sans', 'Spoqa Han Sans KR', 'Sans-serif'; }

            *,
            *:before,
            *:after {
                box-sizing: inherit;
            }

            #__next-build-watcher,
            #__next-prerender-indicator {
                display: none !important;
            }
            
            p, h1, h2, h3, h4, h5, h6, span, button {
                margin: 0;
                padding: 0;
            }
                    `}
      </style>
    </>
  );
}
// App.getInitialProps = async ({Component, ctx}) => {
//     let pageProps = {};
//     const {store, req, isServer, res} = ctx;
//     const cookie = isServer ? req.headers.cookie : "";
//
//     if (res && res.statusCode === 404) {
//         const status = 404;
//         return {status};
//     }
//
//     if (Component.getInitialProps) {
//         pageProps = await Component.getInitialProps({ctx});
//     }
//
//     return {pageProps};
// };
