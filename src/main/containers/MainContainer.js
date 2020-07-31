import {useState, useEffect} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {pointColor, mobile, Image, breakPoints} from "common/theme/theme";
import ContentCard from "main/components/card/ContentCard";
import Header from "common/components/header/Header";
import {withRouter} from "next/router";
import Footer from "common/components/footer/Footer";
import {BASE_URL, PREFIX} from "client/constants";
import {motion} from "framer-motion";
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

  const insertMeta = (game) => {
    const meta = `
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@빙고링" />
        <meta name="twitter:creator" content="@빙고링" />
        <meta property="og:url" content=\`${BASE_URL + "/bingo?id=" + game?.node?.id}\`/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content=\`${game?.node?.title}\`/>
        <meta property="og:description" content="빙고링"/>
        <meta property="og:image" content=\`${game?.node?.thumbnail}\`/>
        <meta property="og:app_id" content="1015774698842581" />
    `

    document.getElementsByTagName('head')[0].append(meta);
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

  if (loading) return "loading...";
  if (error) {
    console.log("error:: ", error);
    return "에러";
  }


  console.log("data", data);

  const {allBingos} = data;
  const {edges} = allBingos;

  return (
    <ContainerFrame>
      {
        showModal &&
        <Modal hideModal={() => toggleModal(false)}>
          <Share
            game={selectedGame}
            onCopyUrl={onCopyUrl}
          />
        </Modal>
      }
      {
        showUrlModal &&
        <OneButtonModal hideModal={() => toggleUrlModal(false)}/>
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
                index={index}
                variants={SLIDE_UP_2}
                whileTap={{scale: 0.95}}
                key={index.toString()}
              >
                <ContentCard
                  onPressShareButton={onPressShareButton}
                  gameStart={() => navigateAndSelectGame(game)}
                  game={game?.node}
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
