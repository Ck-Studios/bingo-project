import BingoContainer from "bingo/containers/BingoContainer";
import ContainerLayout from "common/components/layout/ContainerLayout";
import AnimationFrame from "common/animation/AnimationFrame";
import {initializeStore} from "client/store";
import {initializeApollo} from "client/client";


export default function Index() {
  return (
    <ContainerLayout>
      <AnimationFrame>
        <BingoContainer/>
      </AnimationFrame>
    </ContainerLayout>
  )
}


Index.getInitialProps = async() => {
  const reduxStore = initializeStore();
  const apolloClient = initializeApollo();

  return {
    initialReduxState: reduxStore.getState(),
    initialApolloState: apolloClient.cache.extract()
  }
};
