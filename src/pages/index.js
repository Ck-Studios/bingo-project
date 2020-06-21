import MainContainer from "main/containers/MainContainer";
import ContainerLayout from "common/components/layout/ContainerLayout";
import AnimationFrame from "common/animation/AnimationFrame";
import {pointColor} from "common/theme/theme";
import {initializeApollo} from "client/client";

export default function Index() {
  return (
      <ContainerLayout>
        <AnimationFrame>
          <MainContainer/>
        </AnimationFrame>
      </ContainerLayout>
  )
}

Index.getInitialProps = async() => {
    const apolloClient = initializeApollo();


    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
        unstable_revalidate: 1,
    }
};

