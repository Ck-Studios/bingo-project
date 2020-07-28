import {useState, useEffect} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {pointColor, mobile, Image, breakPoints} from "common/theme/theme";
import ContentCard from "main/components/card/ContentCard";
import Header from "common/components/header/Header";
import {withRouter} from "next/router";
import Footer from "common/components/footer/Footer";
import {PREFIX} from "client/constants";
import {motion} from "framer-motion";
import {CHILDREN_DELAY, SLIDE_UP_2} from "common/animation/AnimationVariants";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag"
import {LOAD_BINGO} from "modules/scheme";
import {useRouter} from "next/router";
import {GAMES} from "mock/data";
import Share from "common/components/share/Share";
import Modal from "common/components/modal/Modal";


function MainContainer(props) {
  const {loading, error, data} = useQuery(LOAD_BINGO);
  const router = useRouter();
  const [showModal, toggleModal] = useState(false);


  if (loading) return "loading...";
  if (error) return "에러";


  console.log("data", data);

  const {allBingos} = data;
  const {edges} = allBingos;

  return (
    <ContainerFrame>
      {
        showModal &&
        <Modal hideModal={() => toggleModal(false)}>
          <Share />
        </Modal>
      }
      <div>
        <Header/>
        <ContentListFrame
          initial="closed"
          animate="open"
          exit="closed"
          variants={CHILDREN_DELAY}
        >
          {
            edges?.map((game, index) => (
              <ItemFrame
                variants={SLIDE_UP_2}
                whileTap={{scale: 0.95}}
                key={index.toString()}
              >
                <ContentCard
                  showShareModal={() => toggleModal(true)}
                  gameStart={() => router.push({
                    pathname: "/bingo",
                    query: {
                      id: game?.node?.id,
                    }
                  })}
                  game={game.node}
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
    background: ${pointColor.white};
`;

const ItemFrame = styled(motion.div)`
    margin-top: 30px;
    width: 100%;
`;

const ContentListFrame = styled(motion.div)`
    padding: 0 18px;
    ${breakPoints.web} {
      padding: 0 27px;
    }
`;
