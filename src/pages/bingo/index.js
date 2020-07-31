import BingoContainer from "bingo/containers/BingoContainer";
import ContainerLayout from "common/components/layout/ContainerLayout";
import AnimationFrame from "common/animation/AnimationFrame";
import {initializeStore} from "client/store";
import {initializeApollo} from "client/client";
import Head from "next/head"
import {useRouter} from "next/router";
import {BASE_URL} from "client/constants";
import {GET_MATCHED_BINGO, LOAD_BINGO} from "modules/scheme";

export default function Index(props) {
  // const game = props?.initialReduxState?.bingo.selectedGame;
  //
  // console.log("game::: ", game);
  // router.query.id
  console.log("matched:: ", props.matchedBingo);
  const matchedGame = props.matchedBingo;

  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@빙고링"/>
        <meta name="twitter:creator" content="@빙고링"/>
        <meta property="og:url" content={BASE_URL + "/bingo?id=" + matchedGame?.id}/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={matchedGame?.title}/>
        <meta property="og:description" content="빙고링"/>
        <meta property="og:image" content={matchedGame?.thumbnail}/>
        <meta property="og:app_id" content="1015774698842581"/>
      </Head>
      <ContainerLayout>
        <AnimationFrame>
          <BingoContainer/>
        </AnimationFrame>
      </ContainerLayout>
    </>
  )
}


Index.getInitialProps = async (context) => {
  const reduxStore = initializeStore();
  const apolloClient = initializeApollo();
  const matchedBingo = await apolloClient.query({
    query: GET_MATCHED_BINGO,
    variables: {id: context.query.id}
  });


  return {
    initialReduxState: reduxStore.getState(),
    initialApolloState: apolloClient.cache.extract(),
    matchedBingo
  }
};
