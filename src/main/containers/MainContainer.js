import {useEffect} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {pointColor, mobile, Image, breakPoints} from "common/theme/theme";
import ContentCard from "main/components/card/ContentCard";
import Header from "common/components/header/Header";
import {withRouter} from "next/router";
import Footer from "common/components/footer/Footer";
import {PREFIX} from "client/constants";
import {motion} from "framer-motion";
import {SLIDE_UP} from "common/animation/AnimationVariants";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag"
import {LOAD_BINGO} from "modules/scheme";
import {useRouter} from "next/router";
import {GAMES} from "mock/data";


function MainContainer(props) {
  // const {loading, error, data} = useQuery(LOAD_BINGO);
  //
  // console.log("data", data);

  // if (loading) return "loading...";
  // if (error) return "에러";

  // const {allBingos} = data;
  // const {edges} = allBingos;
  const router = useRouter();
  return (
    <ContainerFrame>
      <div>
        <Header/>
        <ContentListFrame>
          {
            GAMES.map((game, index) => (
              <ItemFrame
                initial="initial"
                exit="exit"
                animate="enter"
                variants={SLIDE_UP}
                key={index.toString()}
                onClick={() => router.push({
                  pathname: "/bingo",
                  query: {
                    id: game.id,
                  }
                })}
              >
                <ContentCard
                  game={game}
                />
              </ItemFrame>
            ))
          }
        </ContentListFrame>
      </div>
      <Footer/>
    </ContainerFrame>
  )
}

export default withRouter(MainContainer);

const ContainerFrame = styled.div`
    background: ${pointColor.gray0};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const ItemFrame = styled(motion.div)`
    margin-top: 30px;
`;

const ContentListFrame = styled.div`
    padding: 0 30px;
`;
