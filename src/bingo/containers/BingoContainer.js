import {useState, useEffect} from "react";
import styled from "styled-components";
import {pointColor} from "common/theme/theme";
import Game from "bingo/components/Game";
import Header from "common/components/header/Header";
import RecommendedBingo from "bingo/components/RecommendedBingo";
import Footer from "common/components/footer/Footer";
import {SLIDE_UP} from "common/animation/AnimationVariants";
import AnimationFrame from "common/animation/AnimationFrame";
import useScrollDirection from "common/components/hooks/useScrollDirection";

function BingoContainer(props) {
  const [scrollDirection, setScrollDirection] = useState('Up');

  const direction = useScrollDirection("up");

  useEffect(() => {
    setScrollDirection(direction);
  }, [direction]);

  return (
    <ContainerFrame>
      <HeaderFrame enabled={window.scrollY > 300 && scrollDirection === "up"}>
        <Header/>
      </HeaderFrame>
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

const HeaderFrame = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  width: 100%;
  max-width: 540px !important;
  z-index: 25;
  transform: ${({ enabled }) =>
  enabled ? "translateY(0)" : "translateY(-100%)"};
  transition: transform 0.5s;
`;

const ContainerFrame = styled.div`
    width: 100%;
    min-height: 100vh;
    background: ${pointColor.gray0};
`;
