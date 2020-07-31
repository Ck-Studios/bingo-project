import {useEffect} from "react";
import BingoBoard from "common/utils/BingoBoard";
import styled from "styled-components";
import {Image, mobile} from "common/theme/theme";
import {pointColor} from "common/theme/theme";
import Game from "bingo/components/Game";
import Header from "common/components/header/Header";
import RecommendedBingo from "bingo/components/RecommendedBingo";
import Footer from "common/components/footer/Footer";
import {motion} from "framer-motion";
import {BASE_URL, PREFIX} from "client/constants";
import {SLIDE_UP} from "common/animation/AnimationVariants";
import AnimationFrame from "common/animation/AnimationFrame";

function BingoContainer(props) {
  return (
    <ContainerFrame>
      <Header/>
      <AnimationFrame
        variants={SLIDE_UP}
        initial="initial"
        enter="enter"
      >
        <Game
          boardSize={360}
        />
      </AnimationFrame>
      <RecommendedBingo/>
      <Footer/>
    </ContainerFrame>
  )
}

export default BingoContainer;

const ContainerFrame = styled.div`
    width: 100%;
    min-height: 100vh;
    background: ${pointColor.gray0};
`;
