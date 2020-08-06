import MainContainer from "main/containers/MainContainer";
import ContainerLayout from "common/components/layout/ContainerLayout";
import AnimationFrame from "common/animation/AnimationFrame";
import {pointColor} from "common/theme/theme";
import {initializeApollo} from "client/client";
import Head from "next/head";

export default function Index() {
    return (
        <>
            <Head>
                <meta property="og:title" content="빙고링"/>
                <meta property="og:description" content="인기있는 빙고 모음"/>
                <meta property="og:site_name" content="빙고링"/>
            </Head>
            <ContainerLayout>
                <AnimationFrame>
                    <MainContainer/>
                </AnimationFrame>
            </ContainerLayout>
        </>
    )
}

Index.getInitialProps = async () => {
    const apolloClient = initializeApollo();


    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
        unstable_revalidate: 1,
    }
};

