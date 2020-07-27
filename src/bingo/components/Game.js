import {useState, useEffect} from "react";
import {mobile, pointColor, Image, breakPoints, IconFrame, desktop} from "common/theme/theme";
import styled from "styled-components";
import BingoBoard from "common/utils/BingoBoard";
import Share from "common/components/share/Share";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/react-hooks";
import {LOAD_BINGO, LOAD_LOCAL_BINGO} from "modules/scheme";
import {MAX_CLIENT_WIDTH} from "common/constants/constants";
import {GAMES} from "mock/data";
import {motion} from "framer-motion";
import Modal from "common/components/modal/Modal";


export default function Game(props) {
  const router = useRouter();
  const gameId = router.query.id;
  const {data} = useQuery(LOAD_BINGO);

  const games = data?.allBingos?.edges;

  const [showResultImage, toggleResultImage] = useState(false);
  const [gameStatus, setGameStatus] = useState("running");
  const [matchedGame, setMatchedGame] = useState(null);
  const [clientWidth, setClientWidth] = useState(null);
  const [markedCounts, setMarkedCounts] = useState(0);
  const [resultImagePath, setResultImagePath] = useState(null);
  const [showShareModal, toggleShareModal] = useState(false);

  const [resultBoardArray, setResultBoardArray] = useState(null);

  useEffect(() => {
    if (window) {
      const _clientWidth = window.innerWidth > MAX_CLIENT_WIDTH ? MAX_CLIENT_WIDTH : window.innerWidth;
      setClientWidth(_clientWidth);
    }
  }, []);


  useEffect(() => {
    console.log(_matchedGame);
    const _matchedGame = games?.find(item => item.node.id === gameId);
    console.log(_matchedGame)
    setMatchedGame(_matchedGame);
    window.scrollTo(0, 1);
  }, [gameId, games]);

  // useEffect(() => {
  //   const _matchedGame = GAMES?.find(item => item.id === parseInt(gameId));
  //   console.log("matched game::: ", _matchedGame);
  //   setMatchedGame(_matchedGame);
  //   window.scrollTo(0, 1);
  // }, [gameId]);

  const showResults = () => {
    toggleResultImage(true);
    setGameStatus("stop");
  };

  const getResult = () => {
    if (markedCounts <= 6) {
      return (
        <Image
          src={matchedGame?.node?.bingoResults[0]?.image}
        />
      )
    } else if (markedCounts >= 7 && markedCounts <= 13) {
      return (
        <Image
          src={matchedGame?.node?.bingoResults[1]?.image}
        />
      )
    } else if (markedCounts >= 14 && markedCounts <= 19) {
      return (
        <Image
          src={matchedGame?.node?.bingoResults[2]?.image}
        />
      )
    } else if (markedCounts >= 20 && markedCounts <= 25) {
      return (
        <Image
          src={matchedGame?.node?.bingoResults[3]?.image}
        />
      )
    }
  };

  useEffect(() => {
    if (markedCounts <= 6) {
      setResultImagePath(matchedGame?.node?.bingoResults[0]?.image);
    } else if (markedCounts >= 7 && markedCounts <= 13) {
      setResultImagePath(matchedGame?.node?.bingoResults[1]?.image);
    } else if (markedCounts >= 14 && markedCounts <= 19) {
      setResultImagePath(matchedGame?.node?.bingoResults[2]?.image);
    } else if (markedCounts >= 20 && markedCounts <= 25) {
      setResultImagePath(matchedGame?.node?.bingoResults[3]?.image);
    }
  }, [markedCounts]);

  const replayGame = () => {
    toggleResultImage(false);
    // dispatch(resetCounts());
    setGameStatus("reset");
  };

  const saveImage = () => {
    // const node = document.getElementById("bingo");

    // alert('아직 지원하지 않는 기능입니다.');

    const ABSOLUTE_BOARD_SIZE_X = 360;
    const ABSOLUTE_BOARD_SIZE_Y = 450;
    const _resultHeight = 80;
    const canvas = `<canvas id='canvas' width='${ABSOLUTE_BOARD_SIZE_X}' height='${ABSOLUTE_BOARD_SIZE_Y + _resultHeight}'></canvas>`;



    const RING_SIZE = 56;
    const SIDE_WIDTH = 40;

    const x = window.open("about:blank", "_blank");
    x.document.open();
    x.document.write(`<body style="margin: 0"><div id="container" ></div></body>`);
    const boardImage = x.document.createElement("img");
    const resultImage = x.document.createElement("img");
    const ringImage = x.document.createElement("img");
    const xContainer = x.document.getElementById("container");
    let __loadedCounts = 0;

    let __tmpCanvas = null;

    boardImage.src = matchedGame?.node?.boardTheme?.boardImage;
    resultImage.src = resultImagePath ?? "";
    ringImage.src = matchedGame?.node?.boardTheme?.ringImage;

    console.log("xBody:: ", xContainer);
    xContainer.innerHTML = canvas;
    // x.document.write(canvas);
    // x.document.innerHTML = canvas;
    // xBody.innerHTML = canvas;
    const __canvas = x.document.getElementById("canvas");
    const _xCanvas = __canvas.getContext("2d");
    // boardImage.onload = function () {
    //   _xCanvas.drawImage(boardImage, 0, 0, ABSOLUTE_BOARD_SIZE_X, ABSOLUTE_BOARD_SIZE_Y);
    // };

    const images = [boardImage, resultImage, ringImage];

    const calcLocation = (location) => {
      const GAP = 9;
      const positionY = 110;
      return {
        x: (SIDE_WIDTH / 2 + (location.x * RING_SIZE) + (location.x * GAP)) + 2,
        y: (positionY + (location.y * RING_SIZE) + (location.y * GAP)) + 2
      }
    };

    for(let i = 0; i < images.length; i++) {
      images[i].onload = function() {
        __loadedCounts++;
        if(__loadedCounts === images.length) {
          allLoaded();
        }
      }
    }

    // const checkImagesAreLoaded = () => {
    // };

    const allLoaded = () => {
      _xCanvas.drawImage(boardImage, 0, 0, ABSOLUTE_BOARD_SIZE_X, ABSOLUTE_BOARD_SIZE_Y);
      _xCanvas.drawImage(resultImage, 0, ABSOLUTE_BOARD_SIZE_Y, ABSOLUTE_BOARD_SIZE_X, _resultHeight);
      for (let i = 0; i < resultBoardArray.length; ++i) {
        const location = calcLocation(resultBoardArray[i].location);
        _xCanvas.drawImage(ringImage, location.x, location.y, RING_SIZE, RING_SIZE)
      }

      const dataUrl = __canvas.toDataURL("image/png");

      const __img = `<img src=${dataUrl} style="width: 100%; height: 100%;" crossorigin="anonymous">`;
      xContainer.removeChild(__canvas);
      xContainer.innerHTML = __img;
    };

    // boardImage.addEventListener("load", function() {
    //   _xCanvas.drawImage(boardImage, 0, 0, ABSOLUTE_BOARD_SIZE_X, ABSOLUTE_BOARD_SIZE_Y);
    //
    // });

    // resultImage.onload = function () {
    //    _xCanvas.drawImage(resultImage, 0, ABSOLUTE_BOARD_SIZE_Y, ABSOLUTE_BOARD_SIZE_X, _resultHeight);
    // };

    // ringImage.onload = function () {
      // for (let i = 0; i < resultBoardArray.length; ++i) {
      //   const location = calcLocation(resultBoardArray[i].location);
      //   _xCanvas.drawImage(ringImage, location.x, location.y, RING_SIZE, RING_SIZE)
      // }
    // };

    // const dataUrl = __canvas.toDataURL("image/png");
    // __canvas.parentNode.removeChild(__canvas);
    //
    // const __img = `<img src=${dataUrl} width="360" height="450">`;
    // xContainer.innerHTML = __img;
    // const iframe = "<iframe style='border: none' width='100%' height='100%' src='" + dataUrl + "'></iframe>"
    // __canvas.parentNode.removeChild(__canvas);
    // x.document.write(iframe);

    x.document.close();
  };

  return (
    <ContainerFrame>
      <ContentWrapper>
        {
          showShareModal &&
            <Modal hideModal={() => toggleShareModal(false)}>
              <Share/>
            </Modal>
        }
        <BingoFrame id="bingo">
          <Image
            crossorigin
            src={matchedGame?.node?.boardTheme?.boardImage}
          />
          <BoardFrame className="board-frame-container" width={clientWidth}>
            <BingoBoard
              setMarkedCounts={setMarkedCounts}
              boardSize={props.boardSize}
              gameStatus={gameStatus}
              game={matchedGame?.node}
              gameSize={matchedGame?.node?.boardTheme?.size}
              setGameStatus={setGameStatus}
              setResultBoard={setResultBoardArray}
            />
          </BoardFrame>
          {
            showResultImage &&
            <div className="result-image" style={{marginTop: -5}}>
              <Image
                src={resultImagePath}
              />
            </div>
          }
        </BingoFrame>
        {
          showResultImage ?
            <ResultContent>
              <ResultButtonFrame>
                <SaveButton
                  onClick={() => saveImage()}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconFrame
                    size="10px"
                    marginRight="5px"
                  >
                    <Image
                      src={`/static/images/icons/download.svg`}
                    />
                  </IconFrame>
                  <ButtonText>
                    이미지로 저장
                  </ButtonText>
                </SaveButton>
                <RestartButton
                  onClick={() => replayGame()}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconFrame
                    size="12.5px"
                    marginRight="5px"
                  >
                    <Image
                      src={`/static/images/icons/play2.svg`}
                    />
                  </IconFrame>
                  <ButtonText color={pointColor.purpleDark}>
                    다시하기
                  </ButtonText>
                </RestartButton>
              </ResultButtonFrame>
              <div style={{paddingTop: 30}}>
                <Share/>
              </div>
            </ResultContent>
            :
            <ButtonFrame>
              <Message>
                체크하려면 해당하는 칸을 클릭하세요.
              </Message>
              <ResultButton
                onClick={() => markedCounts > 0 && showResults()}
                whileTap={{ scale: 0.95 }}
              >
                <IconFrame
                  size="10px"
                  marginRight="5px"
                >
                  <Image
                    src={`/static/images/icons/play.svg`}
                  />
                </IconFrame>
                <ButtonText>
                  결과보기
                </ButtonText>
              </ResultButton>
              <ShareButton
                onClick={() => toggleShareModal(true)}
                whileTap={{ scale: 0.95 }}
              >
                <IconFrame
                  size="12.5px"
                  marginRight="10px"
                >
                  <Image
                    src={`/static/images/icons/share.svg`}
                  />
                </IconFrame>
                <ButtonText color={pointColor.purpleDark}>
                  공유하기
                </ButtonText>
              </ShareButton>
            </ButtonFrame>
        }
      </ContentWrapper>
    </ContainerFrame>
  )
}
const ContentWrapper = styled.div`
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.23);
`;
const BingoFrame = styled.div`
    
`;

const SaveButton = styled(motion.div)`
    width: 190px;
    height: 46px;
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 23px;
     box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.16);   
`;

const RestartButton = styled(SaveButton)`
    display: flex;
    width: 124px;
    background: ${pointColor.white};
    
`;

const Message = styled.p`
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 14px;
    color: ${pointColor.gray8};
   
`;

const ButtonText = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: ${({color}) => color || pointColor.white};
    
    @media ${breakPoints.web} {
        font-size: 18px;
    }
`;

const ResultContent = styled.div`
    width: 100%;
    background: ${pointColor.white};
    padding: 22px 18px 30px 18px;
`;

const ResultButton = styled(motion.div)`
    margin-top: 10px;
    width: 100%;
    height: 46px;
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.2);
`;

const ShareButton = styled(ResultButton)`
    background: ${pointColor.white};
`;

const ButtonFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: ${pointColor.white};
    padding: 5px 30px 35px 30px;
    border-bottom: 1px solid ${pointColor.gray1};
`;

const ResultButtonFrame = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`;

const BoardFrame = styled.div`
    position: absolute;
    top: ${({width}) => ((width) * 0.30) + 3}px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    
    @media ${breakPoints.web} {
    }
    
`;

const ContainerFrame = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    
    .result-image {
        margin-top: -4px;
    }
`;
