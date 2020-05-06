import React from "react";
import App from "next/app";
import Head from "next/head";
import "swiper/css/swiper.css";
import "react-responsive-modal/styles.css";
import { Provider } from "react-redux";
import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import { AnimatePresence } from "framer-motion";
import configureStore from "client/store";
const isProduction = process.env.NODE_ENV === "production";

class RootApp extends App {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        };
    }

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        const { store, req, isServer, res } = ctx;
        const cookie = isServer ? req.headers.cookie : "";

        if (res && res.statusCode === 404) {
            const status = 404;
            return { status };
        }

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx });
        }

        return { pageProps };
    }


    async componentDidMount() {
        const {store} = this.props;
        const {asPath} = this.props.router;

        document.addEventListener(
            "touchstart",
            event => {
                if (event.touches.length > 1) {
                    event.preventDefault();
                    event.stopPropagation(); // maybe useless
                }
            },
            {passive: false}
        );
    }

    componentDidUpdate() {
        const { history } = this.state;
        const { asPath } = this.props.router;

        if (history[history.length - 1] !== asPath) {
            this.setState(prevState => ({
                history: [...prevState.history, asPath]
            }));
        }
    }

    componentWillUnmount() {
        document.removeEventListener("touchstart");
    }

    render() {
        const { Component, pageProps, store, router, status } = this.props;

        return (
            <>
                <Head>
                    <link href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css' rel='stylesheet' type='text/css'/>
                </Head>
                <Provider store={store}>
                    <>
                        <AnimatePresence exitBeforeEnter>
                            <Component
                                {...pageProps}
                                history={this.state.history}
                                key={router.route}
                            />
                        </AnimatePresence>
                    </>
                </Provider>
                <style global jsx>
                    {`
                        body {
                            margin: 0 auto;
                            max-width: 720px !important;
                            height: 100%;
                        }
                        
                        html {
                            box-sizing: border-box;
                            height: 100%;
                            font-size: 16px;
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
}

export default withRedux(configureStore)(withReduxSaga(RootApp));
