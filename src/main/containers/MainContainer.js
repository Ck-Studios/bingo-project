import {useState, useEffect, useContext, useMemo} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {pointColor, mobile, Image, breakPoints} from "common/theme/theme";
import ContentCard from "main/components/card/ContentCard";
import Header from "common/components/header/Header";
import {withRouter} from "next/router";
import Footer from "common/components/footer/Footer";
import {BASE_URL, PREFIX} from "client/constants";
import {AnimatePresence, motion} from "framer-motion";
import {CHILDREN_DELAY, SLIDE_UP_2} from "common/animation/AnimationVariants";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag"
import {LOAD_BINGO} from "modules/scheme";
import {useRouter} from "next/router";
import {GAMES} from "mock/data";
import {useDispatch} from "react-redux";
import Share from "common/components/share/Share";
import Modal from "common/components/modal/Modal";
import OneButtonModal from "common/components/modal/OneButtonModal";
import {selectBingo} from "modules/bingo";
import IntersectionObserver, {IntersectionContext} from "common/components/layout/IntersectionObserver";


function MainContainer(props) {
  const {loading, error, data} = useQuery(LOAD_BINGO);
  const router = useRouter();
  const dispatch = useDispatch();
  const [showModal, toggleModal] = useState(false);
  const [showUrlModal, toggleUrlModal] = useState(false);
  const [selectedGame, selectGame] = useState(null);

  const onCopyUrl = () => {
    toggleModal(false);
    toggleUrlModal(true);
  };

  const onPressShareButton = (game) => {
    toggleModal(true);
    selectGame(game);
  };

  const navigateAndSelectGame = (game) => {
    dispatch(selectBingo(game?.node));
    router.push({
      pathname: "/bingo",
      query: {
        id: game?.node?.id,
      }
    });
  }

  if (loading) return "";
  if (error) {
    return "에러";
  }

  const {allBingos} = data;
  const {edges} = allBingos;

  return (
    <ContainerFrame>
      <AnimatePresence>
        {
          showModal &&
          <Modal hideModal={() => toggleModal(false)} key="modal">
            <Share
              game={selectedGame}
              onCopyUrl={onCopyUrl}
            />
          </Modal>
        }
        {
          showUrlModal &&
          <OneButtonModal hideModal={() => toggleUrlModal(false)} key="modal"/>
        }
      </AnimatePresence>
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
              <IntersectionObserver key={index.toString()}>
                <ItemFrame
                  index={index}
                  delayOrder={1}
                >
                  <ContentCard
                    onPressShareButton={onPressShareButton}
                    gameStart={() => navigateAndSelectGame(game)}
                    game={game?.node}
                  />
                </ItemFrame>
              </IntersectionObserver>
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


const ItemLayout = styled(motion.div)`
    margin-top: 30px;
    width: 100%;
    margin-top: ${({index}) => index > 0 ? 30 : 20}px;
    
    ${breakPoints.web} {
      margin-top: ${({index}) => index > 0 ? 50 : 30}px;
    }
`;

const ContentListFrame = styled(motion.div)`
    padding: 0 18px;
    ${breakPoints.web} {
      padding: 0 27px;
    }
`;

const ItemFrame = ({children, delayOrder, duration = 0.4, easing = [0.42, 0, 0.58, 1]}) => {
  const { inView } = useContext(IntersectionContext);
  const transition = useMemo(
    () => ({
      duration,
      delay: delayOrder / 5,
      ease: easing
    }),
    [duration, delayOrder, easing]
  );

  const variants = {
    hidden: {
      y: 200,
      opacity: 0,
      transition
    },
    show: {
      y: 0,
      opacity: 1,
      transition
    }
  };

  return (
    <ItemLayout
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
      whileTap={{scale: 0.95}}
    >
      {children}
    </ItemLayout>
  )
}
