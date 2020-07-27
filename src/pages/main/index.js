import MainContainer from "main/containers/MainContainer";
import ContainerLayout from "common/components/layout/ContainerLayout";
import AnimationFrame from "common/animation/AnimationFrame";
import {initializeApollo} from "client/client";
import {LOAD_BINGO} from "modules/scheme";
import React from "react";

export default function Index() {
  return (
    <ContainerLayout>
      <AnimationFrame>
        <MainContainer/>
      </AnimationFrame>
    </ContainerLayout>
  )
}

Index.getInitialProps = async () => {
  // const apolloClient = initializeApollo();
  //
  // const test = await apolloClient.query({
  //     query: LOAD_BINGO
  // });
  //
  // console.log(test);
};
