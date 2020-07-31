import BingoContainer from "bingo/containers/BingoContainer";
import ContainerLayout from "common/components/layout/ContainerLayout";
import AnimationFrame from "common/animation/AnimationFrame";
import {initializeStore} from "client/store";
import {initializeApollo} from "client/client";
import Head from "next/head"
import {BASE_URL} from "client/constants";

export default function Index(props) {
  // const game = props?.initialReduxState?.bingo.selectedGame;
  //
  // console.log("game::: ", game);
  return (
    <>

      <ContainerLayout>
        <AnimationFrame>
          <BingoContainer/>
        </AnimationFrame>
      </ContainerLayout>
    </>
  )
}


Index.getInitialProps = async () => {
  const reduxStore = initializeStore();
  const apolloClient = initializeApollo();

  return {
    initialReduxState: reduxStore.getState(),
    initialApolloState: apolloClient.cache.extract()
  }
};
